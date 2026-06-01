require('dotenv').config();
const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const { createClient } = require('@supabase/supabase-js');
const { processTTS } = require('./ttsService');
const db = require('./db');
const { QUEUE_NAME, SUPABASE_URL, SUPABASE_KEY, SUPABASE_BUCKET } = require('./config');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const redisConnection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    tls: { rejectUnauthorized: false }
});

const worker = new Worker(
    QUEUE_NAME,
    async (job) => {
        const startTime = Date.now();
        const { text, voice, databaseId, userId } = job.data;

        await db.query(
            `UPDATE tts_jobs SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
            ['processing', databaseId]
        );

        const finalAudioBuffer = await processTTS(text, voice, async (finished, total) => {
            const percentage = total > 0 ? Math.floor((finished / total) * 90) : 0;
            await job.updateProgress(percentage);

            await db.query(
                `UPDATE tts_jobs SET finished_chunks = $1, total_chunks = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3`,
                [finished, total, databaseId]
            );
        });

        await job.updateProgress(95);

        const fileName = `tts-${userId}.mp3`;

        const { error: uploadError } = await supabase.storage
            .from(SUPABASE_BUCKET)
            .upload(fileName, finalAudioBuffer, {
                contentType: 'audio/mpeg',
                upsert: true
            });

        if (uploadError) {
            throw uploadError;
        }

        const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

        await job.updateProgress(100);

        await db.query(
            `UPDATE tts_jobs SET status = $1, time_taken = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3`,
            ['completed', timeTaken, databaseId]
        );

        return {
            status: 'success',
            timeTaken,
            databaseId
        };
    },
    { connection: redisConnection }
);

worker.on('ready', () => console.log('Worker is listening to Upstash Redis queue...'));

worker.on('active', (job) => console.log(`[STARTED] Job ${job.id} is now processing...`));

worker.on('completed', (job) => {
    console.log(`[COMPLETED] Job ${job.id} finished successfully in ${job.returnvalue.timeTaken}s!`);
});

worker.on('failed', async (job, err) => {
    const errorMessage = err?.message || err || "Unknown Error";
    console.error(`[FAILED] Job ${job.id}:`, errorMessage);

    if (job?.data?.databaseId) {
        try {
            await db.query(
                `UPDATE tts_jobs SET status = $1, error_message = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3`,
                ['failed', errorMessage, job.data.databaseId]
            );
        } catch (dbError) {
            console.error('Failed to update DB on job failure:', dbError);
        }
    }
});
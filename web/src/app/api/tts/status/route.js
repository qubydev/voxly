import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { supabase } from '@/lib/supabase';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || !session.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;

        const result = await db.execute(sql`
      SELECT id, status, finished_chunks, total_chunks, time_taken, error_message 
      FROM tts_jobs 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 1
    `);

        if (!result.rows || result.rows.length === 0) {
            return Response.json({ status: 'idle' }, { status: 200 });
        }

        const job = result.rows[0];
        let audioUrl = null;

        if (job.status === 'completed') {
            const fileName = `tts-${userId}.mp3`;
            const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'audio';

            const { data: files } = await supabase.storage
                .from(bucketName)
                .list('', { search: fileName });

            const fileExists = files && files.some(file => file.name === fileName);

            if (fileExists) {
                const { data, error } = await supabase.storage
                    .from(bucketName)
                    .createSignedUrl(fileName, 3600);

                if (!error && data) {
                    audioUrl = data.signedUrl;
                }
            }
        }

        return Response.json({
            jobId: job.id,
            status: job.status,
            finishedChunks: job.finished_chunks,
            totalChunks: job.total_chunks,
            timeTaken: job.time_taken,
            errorMessage: job.error_message,
            audioUrl
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
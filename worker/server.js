require('dotenv').config();
const express = require('express');
const { Queue } = require('bullmq');
const IORedis = require('ioredis');
const { neon } = require('@neondatabase/serverless');

const app = express();
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

const redisConnection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: { rejectUnauthorized: false }
});

const ttsQueue = new Queue('tts-queue', { connection: redisConnection });

app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice, userId = 'user-1' } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, error: 'Text is required' });
    }

    const activeJobs = await sql`
      SELECT id FROM tts_jobs 
      WHERE user_id = ${userId} AND status IN ('pending', 'processing') 
      LIMIT 1
    `;

    if (activeJobs.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'A generation is already in progress. Please wait until it completes.'
      });
    }

    const dbResult = await sql`
      INSERT INTO tts_jobs (user_id, status, text_content, voice) 
      VALUES (${userId}, 'pending', ${text}, ${voice || 'aria'}) 
      RETURNING id
    `;

    const databaseId = dbResult[0].id;

    const job = await ttsQueue.add('generate-tts', {
      text,
      voice: voice || 'aria',
      databaseId,
      userId
    });

    res.status(201).json({
      success: true,
      job: {
        id: job.id,
        databaseId,
        userId,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
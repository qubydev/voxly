import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { ttsQueue } from '@/lib/queue';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || !session.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;
        const { text, voice } = await req.json();

        if (!text) {
            return Response.json({ error: 'Text is required' }, { status: 400 });
        }

        const activeJobs = await db.execute(sql`
      SELECT id FROM tts_jobs 
      WHERE user_id = ${userId} AND status IN ('pending', 'processing') 
      LIMIT 1
    `);

        if (activeJobs.rows && activeJobs.rows.length > 0) {
            return Response.json({
                error: 'A generation is already in progress. Please wait until it completes.'
            }, { status: 400 });
        }

        const dbResult = await db.execute(sql`
      INSERT INTO tts_jobs (user_id, status, text_content, voice) 
      VALUES (${userId}, 'pending', ${text}, ${voice || 'aria'}) 
      RETURNING id
    `);

        const databaseId = dbResult.rows[0].id;

        const job = await ttsQueue.add('generate-tts', {
            text,
            voice: voice || 'aria',
            databaseId,
            userId
        });

        return Response.json({
            success: true,
            job: {
                id: job.id,
                databaseId,
                status: 'pending'
            }
        }, { status: 201 });

    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
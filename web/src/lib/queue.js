import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const globalForQueue = globalThis;

const redisConnection = globalForQueue.redisConnection || new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    tls: { rejectUnauthorized: false }
});

export const ttsQueue = globalForQueue.ttsQueue || new Queue('tts-queue', { connection: redisConnection });

if (process.env.NODE_ENV !== 'production') {
    globalForQueue.redisConnection = redisConnection;
    globalForQueue.ttsQueue = ttsQueue;
}
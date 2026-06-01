module.exports = {
    MAX_PARALLEL_THREADS: 4,
    CHUNK_CHAR_LIMIT: 2000,
    QUEUE_NAME: 'tts-queue',
    DEFAULT_VOICE: 'aria',
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_BUCKET: process.env.SUPABASE_BUCKET || 'audio'
};
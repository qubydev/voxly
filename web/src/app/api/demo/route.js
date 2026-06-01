import { EdgeTTS } from 'node-edge-tts';
import { readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';
import os from 'os';

const voiceMap = {
    aria: 'en-US-AriaNeural',
    guy: 'en-US-GuyNeural',
    sonia: 'en-GB-SoniaNeural',
    ryan: 'en-GB-RyanNeural',
    elvira: 'es-ES-ElviraNeural',
    denise: 'fr-FR-DeniseNeural',
    conrad: 'de-DE-ConradNeural',
    isabella: 'it-IT-IsabellaNeural',
    nanami: 'ja-JP-NanamiNeural',
    francisca: 'pt-BR-FranciscaNeural',
};

const MAX_CHAR = 500;

export async function POST(request) {
    let tempFile = null;
    try {
        const { text, voice } = await request.json();

        if (!text || !voice) {
            return Response.json({ error: 'Text and voice required' }, { status: 400 });
        }

        if (text.length > MAX_CHAR) {
            return Response.json({ error: `Text exceeds ${MAX_CHAR} characters` }, { status: 400 });
        }

        const edgeVoice = voiceMap[voice];
        if (!edgeVoice) {
            return Response.json({ error: 'Invalid voice' }, { status: 400 });
        }

        tempFile = join(os.tmpdir(), `tts-${randomBytes(8).toString('hex')}.mp3`);

        const tts = new EdgeTTS({ voice: edgeVoice });
        await tts.ttsPromise(text, tempFile);

        const audioBuffer = await readFile(tempFile);
        await unlink(tempFile);

        return new Response(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioBuffer.length,
            },
        });
    } catch (error) {
        if (tempFile) {
            try {
                await unlink(tempFile);
            } catch { }
        }
        console.error('TTS Error:', error.message);
        return Response.json({ error: error.message || 'Failed to generate speech' }, { status: 500 });
    }
}
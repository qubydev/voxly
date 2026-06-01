'use client'
import { useState, useRef, useEffect } from 'react'
import { FiPlay, FiPause, FiDownload } from 'react-icons/fi'
import { Slider } from '@/components/ui/slider'

export default function AudioPlayer({ url }) {
    const audioRef = useRef(null)
    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        const onLoaded = () => setDuration(audio.duration)
        const onTime = () => {
            setCurrentTime(audio.currentTime)
            setProgress((audio.currentTime / audio.duration) * 100 || 0)
        }
        const onEnded = () => setPlaying(false)
        audio.addEventListener('loadedmetadata', onLoaded)
        audio.addEventListener('timeupdate', onTime)
        audio.addEventListener('ended', onEnded)
        return () => {
            audio.removeEventListener('loadedmetadata', onLoaded)
            audio.removeEventListener('timeupdate', onTime)
            audio.removeEventListener('ended', onEnded)
        }
    }, [url])

    const togglePlay = () => {
        if (playing) { audioRef.current.pause() } else { audioRef.current.play() }
        setPlaying(!playing)
    }

    const fmt = s => {
        if (!s || isNaN(s)) return '0:00'
        return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
    }

    return (
        <div className="flex items-center gap-3 w-full">
            <audio ref={audioRef} src={url} preload="metadata" />
            <button
                onClick={togglePlay}
                className="w-8 h-8 flex items-center justify-center border border-border hover:bg-accent transition-colors shrink-0"
            >
                {playing ? <FiPause size={14} /> : <FiPlay size={14} />}
            </button>
            <span className="text-xs text-muted-foreground shrink-0 w-8">{fmt(currentTime)}</span>
            <div className="flex-1">
                <Slider
                    value={[progress]}
                    onValueChange={v => {
                        const t = (v[0] / 100) * duration
                        audioRef.current.currentTime = t
                        setProgress(v[0])
                    }}
                    max={100}
                    step={0.1}
                    className="w-full"
                />
            </div>
            <span className="text-xs text-muted-foreground shrink-0 w-8">{fmt(duration)}</span>
        </div>
    )
}
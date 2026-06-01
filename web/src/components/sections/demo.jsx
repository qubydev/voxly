'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Sparkles, Volume2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MAX_CHAR = 500;

const voices = [
    {
        id: 'aria',
        name: 'Aria',
        language: 'English (US)',
        tag: 'Female',
        avatar: 'https://i.pravatar.cc/150?u=aria1',
        demoText: "I can't believe we finally made it to the top! The view is absolutely breathtaking. This is exactly what I needed after such a long week.",
    },
    {
        id: 'guy',
        name: 'Guy',
        language: 'English (US)',
        tag: 'Male',
        avatar: 'https://i.pravatar.cc/150?u=guy2',
        demoText: "Welcome to our presentation today. We'll be discussing some exciting new developments in our product roadmap.",
    },
    {
        id: 'sonia',
        name: 'Sonia',
        language: 'English (UK)',
        tag: 'Female',
        avatar: 'https://i.pravatar.cc/150?u=sonia3',
        demoText: "Good morning everyone. I'm delighted to share these remarkable results with you today.",
    },
    {
        id: 'ryan',
        name: 'Ryan',
        language: 'English (UK)',
        tag: 'Male',
        avatar: 'https://i.pravatar.cc/150?u=ryan4',
        demoText: "Right then, let's get started shall we? There's quite a lot to cover this afternoon.",
    },
    {
        id: 'elvira',
        name: 'Elvira',
        language: 'Spanish',
        tag: 'Female',
        avatar: 'https://i.pravatar.cc/150?u=elvira5',
        demoText: "¡Hola a todos! Estoy muy emocionada de compartir estas noticias increíbles con ustedes hoy.",
    },
    {
        id: 'denise',
        name: 'Denise',
        language: 'French',
        tag: 'Female',
        avatar: 'https://i.pravatar.cc/150?u=denise6',
        demoText: "Bonjour à tous! Je suis ravie de partager ces résultats remarquables avec vous aujourd'hui.",
    },
    {
        id: 'conrad',
        name: 'Conrad',
        language: 'German',
        tag: 'Male',
        avatar: 'https://i.pravatar.cc/150?u=conrad7',
        demoText: "Guten Morgen zusammen! Ich freue mich, diese erstaunlichen Ergebnisse mit Ihnen heute zu teilen.",
    },
    {
        id: 'isabella',
        name: 'Isabella',
        language: 'Italian',
        tag: 'Female',
        avatar: 'https://i.pravatar.cc/150?u=isabella8',
        demoText: "Buongiorno a tutti! Sono entusiasta di condividere questi risultati straordinari con voi oggi.",
    },
    {
        id: 'nanami',
        name: 'Nanami',
        language: 'Japanese',
        tag: 'Female',
        avatar: 'https://i.pravatar.cc/150?u=nanami9',
        demoText: "みなさん、おはようございます。今日は素晴らしいニュースをお伝えします。",
    },
    {
        id: 'francisca',
        name: 'Francisca',
        language: 'Portuguese (BR)',
        tag: 'Female',
        avatar: 'https://i.pravatar.cc/150?u=francisca10',
        demoText: "Olá a todos! Estou muito feliz em compartilhar essas notícias incríveis com vocês hoje.",
    },
]

const initialText = "I can't believe we finally made it to the top! The view is absolutely breathtaking. This is exactly what I needed after such a long week."

export default function Demo() {
    const [text, setText] = useState(initialText)
    const [activeVoice, setActiveVoice] = useState(voices[0])
    const [isGenerating, setIsGenerating] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasGenerated, setHasGenerated] = useState(false)
    const audioRef = useRef(null)
    const audioCtxRef = useRef(null)
    const analyserRef = useRef(null)
    const visualizerRef = useRef(null)
    const animationFrameRef = useRef(null)

    useEffect(() => {
        audioRef.current = new Audio()
        audioRef.current.crossOrigin = "anonymous"
        const handleEnded = () => setIsPlaying(false)
        audioRef.current.addEventListener('ended', handleEnded)
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded)
                audioRef.current.pause()
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
            if (audioCtxRef.current) {
                audioCtxRef.current.close()
            }
        }
    }, [])

    const setupAudioContext = () => {
        if (!audioCtxRef.current && audioRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext
            const ctx = new AudioContext()
            const analyser = ctx.createAnalyser()
            analyser.fftSize = 64
            const source = ctx.createMediaElementSource(audioRef.current)
            source.connect(analyser)
            analyser.connect(ctx.destination)
            audioCtxRef.current = ctx
            analyserRef.current = analyser
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume()
        }
    }

    useEffect(() => {
        const draw = () => {
            animationFrameRef.current = requestAnimationFrame(draw)
            if (!analyserRef.current || !visualizerRef.current) return
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
            analyserRef.current.getByteFrequencyData(dataArray)
            const bars = visualizerRef.current.children
            for (let i = 0; i < bars.length; i++) {
                const dataIndex = Math.floor((i / bars.length) * (dataArray.length * 0.75))
                const value = dataArray[dataIndex]
                const percent = isPlaying ? Math.max(15, (value / 255) * 100) : 15
                const opacity = isPlaying ? Math.max(0.3, value / 255) : 0.2
                bars[i].style.height = `${percent}%`
                bars[i].style.opacity = opacity.toString()
            }
        }
        if (isPlaying) {
            draw()
        } else if (visualizerRef.current) {
            const bars = visualizerRef.current.children
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.height = '15%'
                bars[i].style.opacity = '0.2'
            }
        }
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isPlaying])

    const handleGenerateAndPlay = async () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
            return
        }

        if (hasGenerated) {
            setupAudioContext()
            audioRef.current.play()
            setIsPlaying(true)
            return
        }

        setIsGenerating(true)
        try {
            const response = await fetch('/api/demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, voice: activeVoice.id })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to generate audio')
            }

            const audioBlob = await response.blob()
            const audioUrl = URL.createObjectURL(audioBlob)

            audioRef.current.src = audioUrl
            setHasGenerated(true)
            setupAudioContext()
            audioRef.current.play()
            setIsPlaying(true)
        } catch (error) {
            console.error('Error:', error)
            alert(error.message || 'Failed to generate audio')
        } finally {
            setIsGenerating(false)
        }
    }

    const selectVoice = (voice) => {
        setActiveVoice(voice)
        setText(voice.demoText)
        setHasGenerated(false)
        setIsPlaying(false)
        if (audioRef.current) {
            audioRef.current.pause()
        }
    }

    const handleTextChange = (e) => {
        const newText = e.target.value.slice(0, MAX_CHAR)
        setText(newText)
        setHasGenerated(false)
        setIsPlaying(false)
        if (audioRef.current) {
            audioRef.current.pause()
        }
    }

    return (
        <section id="demo" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto max-w-6xl">
                <h2 className="mb-16 md:mb-24 text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Try the <span className="text-muted-foreground">editor</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
                    <div className="lg:col-span-8 flex flex-col border border-border bg-card shadow-sm h-fit lg:h-[500px]">
                        <div className="flex-1 w-full flex flex-col p-6 lg:p-10">
                            <textarea
                                value={text}
                                onChange={handleTextChange}
                                className="flex-1 w-full p-4 border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                                placeholder="Write your custom text here..."
                            />
                            <div className="text-xs text-muted-foreground mt-3 text-right">
                                {text.length} / {MAX_CHAR} characters
                            </div>
                        </div>
                        <div className="border-t border-border p-4 bg-muted/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div
                                ref={visualizerRef}
                                className="flex flex-1 items-center justify-start gap-1 h-10 w-full sm:w-auto"
                            >
                                {[...Array(32)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1.5 bg-primary transition-all duration-75 rounded-none"
                                        style={{ height: '15%', opacity: 0.2 }}
                                    />
                                ))}
                            </div>
                            <Button
                                size="lg"
                                onClick={handleGenerateAndPlay}
                                disabled={isGenerating || text.length === 0}
                                className="w-full sm:w-auto min-w-[200px] rounded-none h-12 text-base shadow-none shrink-0"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Generating...
                                    </>
                                ) : isPlaying ? (
                                    <>
                                        <Pause className="w-5 h-5 mr-2 fill-current" />
                                        Pause Audio
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        Generate & Play
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col border border-border bg-card shadow-sm h-fit lg:h-[500px]">
                        <div className="border-b border-border p-4 bg-muted/30">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <Volume2 className="w-4 h-4 text-primary" />
                                Voice Library
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {voices.map((voice) => (
                                <div
                                    key={voice.id}
                                    onClick={() => selectVoice(voice)}
                                    className={`flex items-center gap-4 p-3 border cursor-pointer transition-all shrink-0 ${activeVoice.id === voice.id
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <img
                                        src={voice.avatar}
                                        alt={voice.name}
                                        className="w-12 h-12 object-cover shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-semibold text-sm truncate">{voice.name}</h4>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className="truncate">{voice.language}</span>
                                            <span>•</span>
                                            <span>{voice.tag}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
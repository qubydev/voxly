import { Button } from '@/components/ui/button'
import { RoughNotation } from 'react-rough-notation'

export default function Hero() {
    return (
        <section id="hero">
            <div className="relative z-10 flex flex-col items-center justify-center text-center pt-18 px-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground max-w-3xl leading-[1.08] mb-5">
                    Text-to-speech, <br />
                    <span className="text-muted-foreground font-normal italic">
                        with{' '}
                        <RoughNotation
                            type="underline"
                            show={true}
                            strokeWidth={5}
                        >
                            Emotions
                        </RoughNotation>
                    </span>
                </h1>

                <p className="text-muted-foreground text-lg max-w-xl leading-relaxed mb-10">
                    Human-like voices lightning fast, built for developers.
                </p>

                <div className="flex items-center gap-3 justify-center mb-10 flex-col sm:flex-row">
                    <div>
                        <Button size="lg" className="w-48">
                            Start generating
                        </Button>
                    </div>

                    <div>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-48 bg-card"
                        >
                            See demos
                        </Button>
                    </div>
                </div>
            </div>

            <div className="relative w-full overflow-hidden flex justify-center -mt-30 sm:-mt-28 lg:-mt-36">
                <div className="absolute inset-y-0 left-0 w-16 sm:w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-16 sm:w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
                <video
                    src="/hero-anim.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="block h-full object-cover object-center select-none min-w-4xl"
                />
            </div>
        </section>
    )
}
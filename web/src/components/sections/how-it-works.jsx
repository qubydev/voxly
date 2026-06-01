import React from "react"

function ScreenshotPlaceholder({ rotate = "" }) {
    return (
        <img
            src="https://placehold.co/600x400"
            alt="TTS Platform Screenshot"
            className={`aspect-[4/3] w-full max-w-[520px] object-cover overflow-hidden border bg-background shadow-md ${rotate}`}
        />
    )
}

function Step({
    title,
    description,
    reverse = false,
    rotate = "",
}) {
    return (
        <div
            className={`flex flex-col items-center gap-10 md:px-8 py-12 md:gap-16 lg:gap-24 md:flex-row ${reverse ? "md:flex-row-reverse" : ""
                }`}
        >
            <div className="flex flex-1 justify-center w-full md:px-0">
                <ScreenshotPlaceholder rotate={rotate} />
            </div>

            <div className="flex flex-1 justify-center md:px-0">
                <div className="w-full max-w-md lg:max-w-lg">
                    {/* Dialed back the max size from lg:text-6xl to lg:text-5xl */}
                    <h3 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        {title}
                    </h3>

                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function HowItWorks() {
    const steps = [
        {
            title: (
                <>
                    Type or paste
                    <br />
                    your text.
                </>
            ),
            description:
                "Drop your script, article, or document directly into our intuitive editor. No complex formatting required.",
            reverse: true,
            rotate: "rotate-2",
        },
        {
            title: (
                <>
                    Choose the
                    <br />
                    perfect voice.
                </>
            ),
            description:
                "Browse through our library of hundreds of ultra-realistic, human-like voices across multiple languages and distinct accents.",
            reverse: false,
            rotate: "-rotate-2",
        },
        {
            title: (
                <>
                    Generate and
                    <br />
                    download.
                </>
            ),
            description:
                "Instantly render your text to speech with realistic emotions. Export high-quality audio files ready for your projects in seconds.",
            reverse: true,
            rotate: "rotate-2",
        },
    ]

    return (
        <section id="how-it-works" className="container mx-auto max-w-7xl py-16 md:py-24">
            <h2 className="mb-16 md:mb-24 text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                See <span className="text-muted-foreground">how it works</span>
            </h2>

            <div className="flex flex-col md:gap-12">
                {steps.map((step, index) => (
                    <Step key={index} {...step} />
                ))}
            </div>
        </section>
    )
}
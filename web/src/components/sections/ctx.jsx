import React from 'react'
import { Button } from '@/components/ui/button'

export default function Ctx() {
    return (
        <section id="contact" className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-6 max-w-4xl flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                    Ready to get <span className="text-muted-foreground">started?</span>
                </h2>

                <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 text-balance">
                    Join thousands of creators using Voxly to generate ultra-realistic human voices in seconds.
                </p>

                <Button size="lg" className="rounded-none h-12 px-8 text-base w-full sm:w-auto">
                    Get started
                </Button>
            </div>
        </section>
    )
}
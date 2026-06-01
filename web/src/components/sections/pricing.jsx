'use client'

import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const pricingTiers = [
    {
        name: 'Starter',
        price: {
            monthly: 9,
            yearly: 7,
        },
        description: 'Perfect for hobbyists and individual creators.',
        features: [
            '100,000 characters / month',
            'Standard AI voices',
            'MP3 file exports',
            'Standard rendering speed',
            'Personal use license'
        ],
        buttonText: 'Get started',
        buttonVariant: 'outline',
        isPopular: false,
    },
    {
        name: 'Pro',
        price: {
            monthly: 19,
            yearly: 15,
        },
        description: 'For professionals needing the highest quality.',
        features: [
            'Unlimited characters',
            'Ultra-realistic emotional voices',
            'WAV & MP3 file exports',
            'Lightning fast rendering',
            'Full commercial rights'
        ],
        buttonText: 'Get started',
        buttonVariant: 'default',
        isPopular: true,
    }
]

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(false)

    return (
        <section id="pricing" className="py-16 md:py-24 overflow-hidden bg-background">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-8">
                        Friendly <span className="text-muted-foreground">pricing</span>
                    </h2>

                    <div className="flex items-center justify-center gap-3">
                        <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="relative inline-flex h-6 w-11 items-center bg-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                            role="switch"
                            aria-checked={isYearly}
                        >
                            <span className="sr-only">Toggle billing cycle</span>
                            <span
                                className={`inline-block h-4 w-4 transform bg-background transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                        <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                            Yearly <span className="text-primary text-xs ml-1 font-bold">(SAVE 20%)</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col p-8 border bg-card text-card-foreground shadow-sm transition-all ${tier.isPopular ? 'border-primary md:-translate-y-2 md:shadow-xl' : 'border-border'
                                }`}
                        >
                            {tier.isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs font-semibold shadow-sm">
                                    Best value
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold tracking-tight">
                                        ${isYearly ? tier.price.yearly : tier.price.monthly}
                                    </span>
                                    <span className="text-muted-foreground font-medium text-sm">
                                        / month
                                    </span>
                                </div>
                                {isYearly && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Billed ${(isYearly ? tier.price.yearly : tier.price.monthly) * 12} annually
                                    </p>
                                )}
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-sm md:text-base text-muted-foreground">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                size="lg"
                                variant={tier.buttonVariant}
                                className="w-full rounded-none"
                            >
                                {tier.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
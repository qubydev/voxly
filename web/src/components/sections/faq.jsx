import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

const faqs = [
    {
        q: 'Does it download the actual audio file or just save a link?',
        a: 'It generates and downloads the actual high-quality audio file (WAV or MP3) directly to your device. You own the file and can use it anywhere.',
    },
    {
        q: 'What languages and accents are supported?',
        a: 'We support over 40 languages and multiple regional accents. From American and British English to Spanish, Japanese, and more, you will find the perfect voice for your content.',
    },
    {
        q: 'Can I use the generated voices for commercial projects?',
        a: 'Yes! All voices generated on our paid plans come with full commercial rights. You can use them for YouTube videos, podcasts, ads, and video games without attribution.',
    },
    {
        q: 'How fast is the generation process?',
        a: 'Our models are optimized for lightning-fast inference. Most generations, even for longer paragraphs, complete in just a few seconds.',
    },
    {
        q: 'Can I control the emotion and pacing?',
        a: 'Absolutely. Our advanced editor allows you to add emotional tags (like excited, sad, or professional) and adjust pacing, pauses, and emphasis for specific words.',
    },
]

export default function Faq() {
    return (
        <section className='w-full max-w-4xl mx-auto py-24 md:py-32' id="faq">
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 md:mb-20 tracking-tight text-balance'>
                Frequently <span className='text-muted-foreground'>asked</span>
            </h2>

            <Accordion type='single' collapsible className="mb-12 w-full">
                {faqs.map((faq, i) => (
                    <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        className='border-0 border-b border-border py-2'
                    >
                        <AccordionTrigger className='text-left text-base md:text-lg font-medium hover:no-underline py-4'>
                            {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className='text-muted-foreground text-sm md:text-base leading-relaxed pb-6'>
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className='flex flex-col sm:flex-row items-center justify-between bg-muted border px-4 py-4 gap-6'>
                <div className='flex items-center gap-4'>
                    <div className="p-3 rounded-full flex-shrink-0">
                        <MessageSquare size={26} className='text-primary' />
                    </div>
                    <div>
                        <p className='text-base font-semibold text-foreground mb-1'>Still have questions?</p>
                        <p className='text-sm text-muted-foreground'>We are here to help you get started.</p>
                    </div>
                </div>
                <Link href='#contact' className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">
                        Contact support
                    </Button>
                </Link>
            </div>
        </section>
    )
}
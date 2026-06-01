import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FaMedium, FaDiscord, FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
    return (
        <footer className="bg-zinc-950 text-zinc-50 py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    <div className="flex flex-col items-start">
                        <div className="mb-6 h-12 w-12 relative flex items-center justify-center bg-zinc-50 rounded-xl overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Voxly Logo"
                                height={42}
                                width={42}
                                className="object-cover"
                            />
                        </div>
                        <p className="text-zinc-400 mb-8 max-w-[200px] text-sm leading-relaxed font-medium">
                            Built for creators, never sounding robotic again!
                        </p>
                        <Button className="bg-zinc-50 text-zinc-950 hover:bg-zinc-200 rounded-none h-12 px-6 font-semibold">
                            Get started
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 md:pl-12">
                        <h4 className="font-semibold text-zinc-50 mb-2">Home</h4>
                        <Link href="#how-it-works" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                            Overview
                        </Link>
                        <Link href="#demo" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                            Working
                        </Link>
                        <Link href="#features" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                            Features
                        </Link>
                        <Link href="#pricing" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                            Pricing
                        </Link>
                        <Link href="#faq" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                            FAQs
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-zinc-50 mb-2">Resources</h4>
                        <Link href="#" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                            Terms
                        </Link>
                        <Link href="#" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#contact" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                            Contact
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-zinc-50 mb-2">Social Profiles</h4>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 bg-zinc-50 text-zinc-950 flex items-center justify-center hover:bg-zinc-200 transition-colors rounded-none">
                                <FaMedium className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-zinc-50 text-zinc-950 flex items-center justify-center hover:bg-zinc-200 transition-colors rounded-none">
                                <FaDiscord className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-zinc-50 text-zinc-950 flex items-center justify-center hover:bg-zinc-200 transition-colors rounded-none">
                                <FaXTwitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}
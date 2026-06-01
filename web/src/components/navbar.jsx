'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const navLinks = [
    { href: '#demo', label: 'Demo' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#faq', label: 'FAQ' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#pricing', label: 'Pricing' },
]

const linkClass =
    'px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all hover:after:w-full'

export default function Navbar() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const {
        data: session,
        isPending,
    } = authClient.useSession()

    return (
        <>
            <div className="fixed left-0 top-0 z-50 w-full px-0 md:px-4 md:py-6">
                <nav className="relative mx-auto flex max-w-6xl items-center bg-card px-6 py-4 border-b md:border-b-2 md:border-2">
                    <Link href="/" className="inline-flex items-center justify-center gap-1">
                        <Image src="/logo.png" alt="Voxly Logo" width={36} height={36} />
                        <span className="text-3xl font-bold">voxly</span>
                    </Link>

                    <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <a href={href} className={linkClass}>
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex-1" />

                    <Button
                        size="lg"
                        className="hidden md:inline-flex"
                        onClick={() => router.push(session ? '/' : '/login')}
                    >
                        {session ? 'Dashboard' : 'Login'}
                    </Button>

                    <button
                        onClick={() => setOpen(!open)}
                        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${open ? 'opacity-0' : ''
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''
                                }`}
                        />
                    </button>

                    <div
                        className={`absolute left-0 top-full flex w-full flex-col border-t-0 bg-card shadow-xl transition-all duration-300 md:hidden ${open
                            ? 'visible translate-y-0 opacity-100'
                            : 'invisible -translate-y-2 opacity-0'
                            }`}
                    >
                        <ul className="flex flex-col gap-1 px-4 py-4">
                            {navLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        className="block rounded-md px-4 py-3 font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t px-6 py-4">
                            <Button
                                size="lg"
                                className="w-full"
                                onClick={() => {
                                    setOpen(false)
                                    router.push(session ? '/' : '/login')
                                }}
                            >
                                {session ? 'Dashboard' : 'Login'}
                            </Button>
                        </div>
                    </div>
                </nav>
            </div>

            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 transition-all duration-300 md:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
            />
        </>
    )
}
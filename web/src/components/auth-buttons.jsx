'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { authClient } from "@/lib/auth-client";
import { useState } from 'react'

export default function AuthButtons() {
    const [githubLoading, setGithubLoading] = useState(false)

    const handleGithubLogin = async () => {
        setGithubLoading(true)
        await authClient.signIn.social({
            provider: 'github',
        })
        setTimeout(() => {
            setGithubLoading(false)
        }, 5000)
    }

    return (
        <>
            <Button variant="outline" size="lg" className="gap-3" onClick={handleGithubLogin} disabled={githubLoading}>
                <FaGithub size={18} />
                {githubLoading ? 'Redirecting...' : 'Continue with GitHub'}
            </Button>
        </>
    )
}

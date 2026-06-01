import React from 'react'
import { Star } from 'lucide-react'
import { Marquee } from '@/components/ui/marquee'

const reviews = [
    {
        id: 1,
        name: "Alex Rivera",
        username: "@alexrivera_dev",
        body: "The emotion control is unreal. We swapped out our expensive voice actors for Voxly and our user engagement actually went up. Lightning fast API too.",
        img: "https://i.pravatar.cc/150?u=alex",
    },
    {
        id: 2,
        name: "Sarah Chen",
        username: "@sarahchen_creates",
        body: "I generate hours of audiobook content daily. The pacing and natural breaths make it completely indistinguishable from human narration.",
        img: "https://i.pravatar.cc/150?u=sarah",
    },
    {
        id: 3,
        name: "Marcus Johnson",
        username: "@marcus_j_tech",
        body: "Integration took less than an hour. The documentation is pristine and the generated audio files are perfectly optimized for our web app.",
        img: "https://i.pravatar.cc/150?u=marcusj",
    },
    {
        id: 4,
        name: "Elena Rodriguez",
        username: "@elena_prod",
        body: "Finally, a TTS platform that gets Spanish accents right. The regional variations are incredibly accurate and saved our localization budget.",
        img: "https://i.pravatar.cc/150?u=elena",
    },
    {
        id: 5,
        name: "David Kim",
        username: "@dkim_gaming",
        body: "We use it for dynamic NPC dialogue in our indie game. The ability to inject fear or excitement into the voice generation is a total game changer.",
        img: "https://i.pravatar.cc/150?u=david",
    },
    {
        id: 6,
        name: "Rachel Foster",
        username: "@rachel_edu",
        body: "Our e-learning platform relies heavily on Voxly. The clear pronunciation and professional tone options keep our students focused.",
        img: "https://i.pravatar.cc/150?u=rachel",
    },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({ img, name, username, body }) => {
    return (
        <div className="flex flex-col w-72 md:w-80 p-5 rounded-none border bg-card text-card-foreground shadow-sm m-2 shrink-0 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 flex-1">
                "{body}"
            </p>
            <div className="flex items-center gap-3 mt-auto">
                <img
                    className="rounded-full border border-muted w-9 h-9 object-cover"
                    alt={name}
                    src={img}
                />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-none mb-1">{name}</span>
                    <span className="text-xs text-muted-foreground leading-none">{username}</span>
                </div>
            </div>
        </div>
    )
}

export default function Testimonial() {
    return (
        <section id="testimonials" className="py-16 md:py-24 overflow-hidden bg-background">
            <div className="container mx-auto max-w-7xl">
                <h2 className="mb-12 md:mb-24 text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
                    Loved by <span className="text-muted-foreground">creators</span>
                </h2>
            </div>

            <div className="md:hidden relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
                <Marquee vertical pauseOnHover className="[--duration:40s]">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
                </Marquee>

                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background to-transparent"></div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
            </div>

            <div className="hidden md:flex relative w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:40s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
                </Marquee>

                <Marquee reverse pauseOnHover className="[--duration:45s] mt-4">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
                </Marquee>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
            </div>
        </section>
    )
}
import Navbar from '@/components/navbar'
import Hero from '@/components/sections/hero'
import HowItWorks from '@/components/sections/how-it-works'
import Demo from '@/components/sections/demo'
import Faq from '@/components/sections/faq'
import Testimonial from '@/components/sections/testimonial'
import Pricing from '@/components/sections/pricing'
import Ctx from '@/components/sections/ctx'
import Footer from '@/components/footer'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background pt-20 md:pt-26 overflow-hidden">
            <Navbar />
            <Hero />

            <div className='mx-auto max-w-7xl px-4'>
                <div className='flex flex-col gap-8'>
                    <Demo />
                    <HowItWorks />
                    <Faq />
                    <Testimonial />
                    <Pricing />
                    <Ctx />
                </div>
            </div>

            <Footer />
        </div>
    )
}
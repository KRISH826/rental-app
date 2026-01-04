"use client"
import Image from "next/image"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const HeroSection = () => {
    return (
        <section className="relative h-[calc(100vh-60px)] flex items-center flex-col justify-center overflow-hidden">
            <Image
                src="/landing-splash.jpg"
                alt="Hero"
                fill
                className="object-cover object-center"
                priority={true}
            />
            <div className="absolute inset-0 bg-black/60 z-10" />

            <div className="container relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="space-y-4"
                >
                    <h1 className="sm:text-3xl text-2xl md:text-5xl font-bold text-primary-100 tracking-tight">
                        Find your <span className="text-secondary-500">next rental</span> property
                    </h1>
                    <p className="text-sm md:text-base font-light text-primary-200 max-w-2xl mx-auto">
                        Discover the best rental properties in your area with our premium selection.
                    </p>
                    <div className="flex justify-center max-w-sm mx-auto items-center shadow-2xl rounded-lg overflow-hidden ring-1 ring-white/10">
                        <Input
                            placeholder="Search by city, neighborhood, or zip..."
                            className="h-12 bg-white/95 border-none rounded-none flex-1 px-6 text-primary-900 placeholder:text-primary-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                        />
                        <Button className="h-12 cursor-pointer rounded-none px-8 bg-secondary-700/95 hover:bg-secondary-700 text-white font-semibold text-base transition-all duration-300 ease-in-out border-none active:scale-95">
                            Search
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
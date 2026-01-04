"use client"
import React, { useEffect, useState } from 'react'
import { motion, Variants } from 'motion/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2,
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

const CallToAction = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <section className="lg:py-24 md:py-16 py-12 bg-background overflow-hidden">
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden bg-primary-700 min-h-[400px] flex items-center"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/landing-call-to-action.jpg"
                            alt="Call to action"
                            fill
                            className="object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-primary-900 via-primary-800/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 xl:px-10 sm:px-6 px-4 2xl:py-24 xl:py-20 lg:py-16 md:py-12 py-10 max-w-lg">
                        <motion.h2
                            variants={itemVariants}
                            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-100 leading-tight"
                        >
                            Find your perfect home <br />
                            <span className="text-secondary-500">with ease and confidence.</span>
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="mt-6 2xl:text-lg md:text-base text-sm text-primary-200 font-light max-w-lg"
                        >
                            Join our community of thousands who have found their dream rental through our verified listings and advanced search tools.
                        </motion.p>
                        <motion.div
                            variants={itemVariants}
                            className="mt-10 flex flex-wrap gap-4"
                        >
                            <Button className="h-12 cursor-pointer sm:px-8 px-6 bg-secondary-600 hover:bg-secondary-700 text-white border-none active:scale-95 transition-all duration-300">
                                Get Started Now
                            </Button>
                            <Button variant="outline" className="h-12 cursor-pointer sm:px-8 px-6 border-white text-white hover:bg-white hover:text-primary-900 active:scale-95 transition-all duration-300 bg-transparent">
                                Learn More
                            </Button>
                        </motion.div>
                    </div>

                    {/* Decorative element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="absolute right-[-10%] top-[-10%] w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl z-0"
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default CallToAction
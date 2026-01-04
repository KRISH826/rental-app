"use client"
import React, { useEffect, useState } from 'react'
import { motion, Variants } from 'motion/react'
import FeatureCard from './FeatureCard'

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.2,
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

const FeatureSection = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div className='py-24 bg-background'>
                <div className="container">
                    <div className='header max-w-lg text-center'>
                        <h2 className='xl:text-4xl md:text-3xl text-2xl font-bold opacity-0'>
                            Quickly find the home you want using our effective search filters!
                        </h2>
                        <p className='xl:text-base text-sm font-light opacity-0'>
                            Our advanced search tools allow you to find your perfect home with ease. Whether you&apos;re looking for a cozy apartment, a spacious house, or a vacation rental, our filters help you find exactly what you&apos;re looking for.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            variants={containerVariants}
            whileInView="visible"
            viewport={{ once: true }}
            initial="hidden"
            className='lg:pt-24 md:pt-16 pt-12 bg-background'
        >
            <div className="container">
                <div className='header max-w-lg space-y-4 mx-auto text-center'>
                    <motion.h2 className='xl:text-4xl md:text-3xl text-2xl font-bold' variants={itemVariants}>
                        Quickly find the home you want using <br className='md:block hidden' /> our effective search filters!
                    </motion.h2>
                    <motion.p className='xl:text-base text-sm font-light' variants={itemVariants}>
                        Our advanced search tools allow you to find your perfect home with ease. Whether you&apos;re looking for a cozy apartment, a spacious house, or a vacation rental, our filters help you find exactly what you&apos;re looking for.
                    </motion.p>
                </div>
                <div className="grid sm:mt-10 mt-6 grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    {[0, 1, 2].map((index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <FeatureCard
                                imageSrc={`/landing-search${3 - index}.png`}
                                title={
                                    [
                                        "Trustworthy and Verified Listings",
                                        "Browse Rental Listings with Ease",
                                        "Simplify Your Rental Search with Advanced",
                                    ][index]
                                }
                                description={
                                    [
                                        "Discover the best rental options with user reviews and ratings.",
                                        "Get access to user reviews and ratings for a better understanding of rental options.",
                                        "Find trustworthy and verified rental listings to ensure a hassle-free experience.",
                                    ][index]
                                }
                                linkText={["Explore", "Search", "Discover"][index]}
                                linkHref={["/explore", "/search", "/discover"][index]}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default FeatureSection
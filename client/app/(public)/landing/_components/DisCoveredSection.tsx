"use client"
import React, { useEffect, useState } from 'react'
import { motion, Variants } from 'motion/react'
import FeatureCard from './FeatureCard'
import DiscoveredCard from './DiscoveredCard'

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
                            Discover the best rental properties
                        </h2>
                        <p className="mt-2 text-gray-500 max-w-3xl mx-auto">
                            Searching for your dream rental property has never been easier. With
                            our user-friendly search feature, you can quickly find the perfect
                            home that meets all your needs. Start your search today and discover
                            your dream rental property!
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
                        Discover the best rental properties
                    </motion.h2>
                    <motion.p className='xl:text-base text-sm font-light' variants={itemVariants}>
                        Searching for your dream rental property has never been easier. With
                        our user-friendly search feature, you can quickly find the perfect
                        home that meets all your needs. Start your search today and discover
                        your dream rental property!
                    </motion.p>
                </div>

                <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4 text-center">
                    {[
                        {
                            imageSrc: "/landing-icon-wand.png",
                            title: "Search for Properties",
                            description:
                                "Browse through our extensive collection of rental properties in your desired location.",
                        },
                        {
                            imageSrc: "/landing-icon-calendar.png",
                            title: "Book Your Rental",
                            description:
                                "Once you've found the perfect rental property, easily book it online with just a few clicks.",
                        },
                        {
                            imageSrc: "/landing-icon-heart.png",
                            title: "Enjoy your New Home",
                            description:
                                "Move into your new rental property and start enjoying your dream home.",
                        },
                    ].map((card, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <DiscoveredCard {...card} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default FeatureSection
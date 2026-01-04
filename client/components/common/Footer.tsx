import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-background pb-5'>
            <div className="container">
                <div className='text-center flex md:flex-row flex-col w-full md:justify-between justify-center items-center gap-5 pb-10'>
                    <Link href="/">
                        <span className='font-bold md:text-2xl text-xl text-primary-900'>Rental App</span>
                    </Link>
                    <div className='flex justify-center flex-row gap-5'>
                        <Link className='font-light text-base' href="/about">About</Link>
                        <Link className='font-light text-base' href="/contact">Contact</Link>
                        <Link className='font-light text-base' href="/privacy-policy">Privacy Policy</Link>
                        <Link className='font-light text-base' href="/terms-of-service">Terms of Service</Link>
                    </div>
                    <div className="socials_icon flex justify-center flex-row gap-6">
                        <Link href="https://www.facebook.com/" target="_blank">
                            <Facebook />
                        </Link>
                        <Link href="https://www.instagram.com/" target="_blank">
                            <Instagram />
                        </Link>
                        <Link href="https://twitter.com/" target="_blank">
                            <Twitter />
                        </Link>
                        <Link href="https://www.linkedin.com/" target="_blank">
                            <Linkedin />
                        </Link>
                    </div>
                </div>
                <div className='text-center border-t pt-5'>
                    <p className='font-light text-base'>© {new Date().getFullYear()} Rental App. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
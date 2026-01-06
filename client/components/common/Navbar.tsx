"use client";

import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useAuthenticator } from '@aws-amplify/ui-react'

const Navbar = () => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    return (
        <header className={`fixed top-0 z-50 w-full shadow-lg h-[${NAVBAR_HEIGHT}px] bg-primary-700`}>
            <div className="container">
                <div className='flex items-center justify-between w-full py-3'>
                    <div className='flex items-center gap-4 md:gap-6'>
                        <Link href="/" scroll={false} className='cursor-pointer'>
                            <div className='flex items-center gap-2'>
                                <Image src='/logo.svg' alt='Logo' width={50} height={50} className='w-6 h-6' />
                                <span className='text-xl font-bold text-primary-100'>RENT<span className='text-secondary-500 font-light'>IFUL</span></span>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <p className='text-primary-200 font-light hidden md:block'>Discover the best rental properties</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-white text-sm hidden sm:block">
                                    Hello, {user?.signInDetails?.loginId || user?.username}
                                </span>
                                <Button
                                    onClick={signOut}
                                    variant={'outline'}
                                    className='cursor-pointer transition-all duration-300 ease-in-out border border-white bg-transparent text-white font-light hover:bg-white hover:text-primary-700'
                                >
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link href="/auth">
                                    <Button variant={'outline'} className='cursor-pointer transition-all duration-300 ease-in-out border border-white bg-transparent text-white font-light hover:bg-white hover:text-primary-700'>Login</Button>
                                </Link>
                                <Link href="/auth">
                                    <Button className='cursor-pointer border-secondary-600 bg-secondary-600 transition-all duration-300 ease-in-out text-primary-100 hover:bg-secondary-700 font-light'>Register</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
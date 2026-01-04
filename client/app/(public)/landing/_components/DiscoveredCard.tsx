import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
type DiscoveredCardProps = {
    imageSrc: string
    title: string
    description: string
}

const DiscoveredCard = ({ imageSrc, title, description }: DiscoveredCardProps) => {
    return (
        <Card className='h-full'>
            <CardContent>
                <div className="bg-primary-700 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto">
                    <Image
                        src={imageSrc}
                        width={30}
                        height={30}
                        className="w-full h-full"
                        alt={title}
                    />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-800">{title}</h3>
                <p className="mt-2 text-base text-gray-500">{description}</p>
            </CardContent>
        </Card>
    )
}

export default DiscoveredCard
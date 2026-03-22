'use client'

import { onBoardingSteps } from '@/lib/data'
import { CheckCircleIcon } from 'lucide-react'

import Link from 'next/link'
import React from 'react'

const OnBoarding = () => {
    return (
        <div className="flex flex-col gap-1 items-start justify-start">
            {onBoardingSteps.map((step, index) => (
                <Link
                    key={index}
                    href={step.link}
                    className="flex items-center gap-2"
                >
                    <CheckCircleIcon width={20} height={20} />
                    <p className="text-base text-foreground">{step.title}</p>
                </Link>
            ))}
        </div>
    )
}

export default OnBoarding
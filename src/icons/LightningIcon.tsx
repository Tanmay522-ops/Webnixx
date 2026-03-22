import React from 'react'

type Props = {
    className?: string
}

const LightningIcon = ({ className }: Props) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z"
                fill="white"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default LightningIcon
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="w-full min-h-screen bg-black">
            {children}
        </div>
    )
}

export default Layout
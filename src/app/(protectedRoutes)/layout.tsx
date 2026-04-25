import React from 'react'
import { redirect } from 'next/navigation'
import { onAuthenticateUser } from '@/actions/auth'
import Sidebar from '@/components/ReusableComponent/LayoutComponents/Sidebar'
import Header from '@/components/ReusableComponent/LayoutComponents/Header'
import { getAllProductFromStripe } from '@/actions/stripe'


type Props = {
    children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
    const userExist = await onAuthenticateUser()

    if (!userExist.user) {
        redirect('/sign-in')
    }

    const stripeProducts = await getAllProductFromStripe()
    console.log("Stripe Products Result:", JSON.stringify(stripeProducts, null, 2))

    return (
        <div className="flex w-full min-h-screen">
            {/* SIDEBAR */}
        <Sidebar/>

            <div className="flex flex-col w-full h-screen overflow-auto px-4 scrollbar-hide container mx-auto">
                {/* HEADER */}
                <Header user={userExist.user} stripeProducts={stripeProducts.products || []}/>

                {/* MAIN */}
               <div className='flex-1 py-10'>
                    {children}
               </div>
            </div>
        </div>
    )
}

export default Layout
import React from 'react'
import { redirect } from 'next/navigation'
import { onAuthenticateUser } from '@/actions/auth'
import Sidebar from '@/components/ReusableComponent/LayoutComponents/Sidebar'
import Header from '@/components/ReusableComponent/LayoutComponents/Header'
import { getAllProductFromStripe } from '@/actions/stripe'
import { getAllAssistants } from '@/actions/vapi'



type Props = {
    children: React.ReactNode

}

const Layout = async ({ children }: Props) => {
    const userExist = await onAuthenticateUser()

    if (!userExist.user) {
        redirect('/sign-in')
    }

    const stripeProducts = await getAllProductFromStripe()
    const assistants = await getAllAssistants()
    console.log(assistants)

    return (
        <div className="flex w-full min-h-screen">
            {/* SIDEBAR */}
        <Sidebar/>

            <div className="flex flex-col w-full h-screen overflow-auto px-4 scrollbar-hide container mx-auto">
                {/* HEADER */}
                <Header 
                user={userExist.user} 
                stripeProducts={stripeProducts.products || []}
                assistants={assistants.data || []}
                />

                {/* MAIN */}
               <div className='flex-1 py-10'>
                    {children}
               </div>
            </div>
        </div>
    )
}

export default Layout
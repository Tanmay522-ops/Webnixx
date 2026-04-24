import { onAuthenticateUser } from '@/actions/auth'
import { getWebinarByPresenterId } from '@/actions/webinar'
import PageHeader from '@/components/ReusableComponent/PageHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LeadIcon from '@/icons/LeadIcon'

import { HomeIcon, Webcam } from 'lucide-react'
import { redirect } from 'next/navigation'

import React from 'react'
import WebinarCard from './_components/WebinarCard'
import { Webinar, WebinarStatusEnum } from '@prisma/client'
import Link from 'next/link'

type Props = {
    searchParams: Promise<{
        webinarStatus: string
    }>
}

const Page = async({searchParams}: Props) => {

    const {webinarStatus}  = await searchParams

    const checkUser = await onAuthenticateUser()
    if(!checkUser.user){
        redirect("/")
    }

    const webinars = await getWebinarByPresenterId(
        checkUser?.user?.id,
        webinarStatus as WebinarStatusEnum
    )
    return (
        <Tabs
            defaultValue="all"
            className="w-full flex flex-col gap-8"
        >
            <PageHeader
                leftIcon={<HomeIcon className="w-3 h-3" />}
                mainIcon={<Webcam className="w-12 h-12" />}
                rightIcon={<LeadIcon className="w-4 h-4" />}
                heading="The home to all your webinars"
                placeholder="Search option..."
            >
                <TabsList className="bg-transparent space-x-3">
                    <TabsTrigger
                        value="all"
                        className="bg-secondary opacity-50 data-[state=active]:opacity-100 px-8 py-4"
                    >
                        <Link href="/webinars?webinarStatus=all">ALL</Link>
                    </TabsTrigger>
                    <TabsTrigger
                        value="upcoming"
                        className="bg-secondary opacity-50 data-[state=active]:opacity-100 px-8 py-4"
                    >
                        <Link href="/webinars?webinarStatus=upcoming">Upcoming</Link>
                    </TabsTrigger>
                    <TabsTrigger
                        value="ended"
                        className="bg-secondary opacity-50 data-[state=active]:opacity-100 px-8 py-4"
                    >
                        <Link href="/webinars?webinarStatus=ended">Ended</Link>
                    </TabsTrigger>
                </TabsList>
            </PageHeader>
            <TabsContent
                value="all"
                className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-start place-content-start gap-x-6 gap-y-10"
            >
                {webinars?.length > 0 ? (
                    webinars.map((webinar: Webinar, index: number) => (
                        <WebinarCard
                            key={index}
                            webinar={webinar}
                        />
                    ))
                ) : (
                    <div className="w-full h-[200px] flex justify-center items-center text-primary font-semibold text-2xl col-span-12">
                        No Webinar found
                    </div>
                )}
            </TabsContent>
            <TabsContent
                value="upcoming"
                className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-start place-content-start gap-x-6 gap-y-10"
            >
                {webinars?.length > 0 ? (
                    webinars.map((webinar: Webinar, index: number) => (
                        <WebinarCard
                            key={index}
                            webinar={webinar}
                        />
                    ))
                ) : (
                    <div className="w-full h-[200px] flex justify-center items-center text-primary font-semibold text-2xl col-span-12">
                        No Webinar found
                    </div>
                )}
            </TabsContent>
            <TabsContent
                value="ended"
                className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-start place-content-start gap-x-6 gap-y-10"
            >
                {webinars?.length > 0 ? (
                    webinars.map((webinar: Webinar, index: number) => (
                        <WebinarCard
                            key={index}
                            webinar={webinar}
                        />
                    ))
                ) : (
                    <div className="w-full h-[200px] flex justify-center items-center text-primary font-semibold text-2xl col-span-12">
                        No Webinar found
                    </div>
                )}
            </TabsContent>
        </Tabs>
    )
}

export default Page
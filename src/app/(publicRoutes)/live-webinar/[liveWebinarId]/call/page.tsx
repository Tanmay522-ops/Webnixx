import { getAttendeeById } from '@/actions/attendance'
import { getWebinarById } from '@/actions/webinar'
import { WebinarWithPresenter } from '@/lib/types'
import { CallStatusEnum, WebinarStatusEnum } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'
import AutoConnectCall from './_components/AutoConnectCall'

type Props = {
    params: Promise<{
        liveWebinarId: string
    }>
    searchParams: Promise<{
        attendeeId: string
    }>
}

const page = async ({ params, searchParams }: Props) => {
    const { liveWebinarId } = await params
    const { attendeeId } = await searchParams

    if (!liveWebinarId || !attendeeId) {
        redirect('/404')
    }

    const attendee = await getAttendeeById(attendeeId, liveWebinarId)

    if (!attendee.data) {
        redirect(`/live-webinar/${liveWebinarId}?error=attendee-not-found`)
    }

    const webinar = await getWebinarById(liveWebinarId)
    if (!webinar) {
        redirect('/404')
    }

    if (
        webinar.webinarStatus === WebinarStatusEnum.WAITING_ROOM ||
        webinar.webinarStatus === WebinarStatusEnum.SCHEDULED
    ) {
        redirect(`/live-webinar/${liveWebinarId}?error=webinar-not-started`)
    }

    if (
        webinar.ctaType !== 'BOOK_A_CALL' ||
        !webinar.aiAgentId ||
        !webinar.priceId
    ) {
        redirect(`/live-webinar/${liveWebinarId}?error=cannot-book-a-call`)
    }

    // you cannot attend this call again to prevent the loop simple 
    // once they Started the call thay have just started and if they refresh the call they cannot attend it simple  
    
    if (attendee.data.callStatus === CallStatusEnum.COMPLETED) {
        redirect(`/live-webinar/${liveWebinarId}?error=call-not-pending`)
    }
    return (
        <AutoConnectCall
            userName={attendee.data.name}
            assistantId={webinar.aiAgentId}
            webinar={webinar as WebinarWithPresenter}
            userId={attendeeId}
        />
    )
}

export default page
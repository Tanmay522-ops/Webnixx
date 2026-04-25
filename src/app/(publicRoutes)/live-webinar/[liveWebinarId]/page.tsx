import { onAuthenticateUser } from '@/actions/auth'
import { getWebinarById } from '@/actions/webinar'
import React from 'react'
import RenderWebinar from './_components/RenderWebinar'
import { WebinarWithPresenter } from '@/lib/types'
import { WebinarStatusEnum } from '@prisma/client'
import { getStreamRecording } from '@/actions/streamIo'

type Props = {
    params: Promise<{
        liveWebinarId: string
    }>
    searchParams: Promise<{
        error: string
    }>
}

const page = async ({params,searchParams}: Props) => {
    const {liveWebinarId}  =  await params
    const {error} = await searchParams
    const webinarData = await getWebinarById(liveWebinarId)

let recording = null

if(webinarData?.webinarStatus === WebinarStatusEnum.ENDED){
    recording = await getStreamRecording(liveWebinarId)
}
    if (!webinarData) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center text-lg sm:text-4xl">
                Webinar not found
            </div>
        )
    }

    const checkUser = await onAuthenticateUser()
    // Todo: Create API keys
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string

    return (
        <div className="w-full min-h-screen mx-auto">
            <RenderWebinar
                apiKey={apiKey}
                user={checkUser.user || null}
                error={error}
                webinar={webinarData as WebinarWithPresenter}
                recording={recording?.[recording.length - 1] || null}
            />
        </div>
    )
}

export default page
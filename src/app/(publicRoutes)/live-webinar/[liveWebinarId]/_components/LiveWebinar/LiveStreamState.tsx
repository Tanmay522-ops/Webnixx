"use client"
import {
    StreamVideo,
    StreamVideoClient,
    User as StreamUser,
} from '@stream-io/video-react-sdk'
import { WebinarWithPresenter } from '@/lib/types'
import { User } from '@prisma/client'
import React from 'react'
import CustomLivestreamPlayer from './CustomLiveStreamPlayer'

type Props = {
    apiKey: string
    token: string
    callId: string
    webinar: WebinarWithPresenter
    user: User
}

const hostUser: StreamUser = {id:process.env.NEXT_PUBLIC_STREAM_USER_ID!}
const LiveStreamState = ({ apiKey, token, callId, webinar, user }: Props) => {
    const client = new StreamVideoClient({apiKey,user:hostUser,token})
    return <StreamVideo client={client}>
                <CustomLivestreamPlayer
                callId={callId}
                callType='livestream'
                webinar = {webinar}
                username={user.name}
                token = {token}
                />
    </StreamVideo>
}

export default LiveStreamState
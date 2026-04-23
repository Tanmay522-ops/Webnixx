'use client'
import { WebinarWithPresenter } from '@/lib/types'
import { useStreamVideoClient, Call, StreamCall } from '@stream-io/video-react-sdk'

import React, { useEffect, useState } from 'react'
import LiveWebinarView from '../Common/LiveWebinarView'

type Props = {
    username: string
    callId: string
    callType: string
    webinar: WebinarWithPresenter
    token: string
}

const CustomLivestreamPlayer = ({
    username,
    callId,
    callType,
    webinar,
    token,
}: Props) => {
    const client = useStreamVideoClient()
    const [call, setCall] = useState<Call>()
    const [showChat, setShowChat] = useState(true)

    useEffect(() => {
        if (!client) return
        const myCall = client.call(callType, callId)
        setCall(myCall)
        myCall.join({ create: true })
            .then(() => myCall.goLive())
        .catch((e) => {
            console.error('Failed to join call', e)
        })

        return () => {
            myCall.stopLive()              // ← stop live on cleanup
                .then(() => myCall.leave())
                .catch((e) => {
                    console.error('Failed to leave call', e)
                })
            setCall(undefined)
        }
    }, [client, callId, callType])

    if (!call) return null

    return(
        <StreamCall call={call}>
            <LiveWebinarView
                showChat={showChat}
                setShowChat={setShowChat}
                isHost={true}
                username={username}
                userId={process.env.NEXT_PUBLIC_STREAM_USER_ID!}
                userToken={token}
                webinar={webinar}
            />
        </StreamCall>
    )
}

export default CustomLivestreamPlayer
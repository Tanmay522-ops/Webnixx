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
        myCall.join({ create: true }).then(
            () => setCall(myCall),
            () => console.error("Failed to join the call"),
        )

        return () => {
        //    myCall.leave().catch((e)=>{
        //     console.error("Failed to leave call",e)
        //    })
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
                userId={webinar.presenter.id}
                userToken={token}
                webinar={webinar}
                call={call}
            />
        </StreamCall>
    )
}

export default CustomLivestreamPlayer
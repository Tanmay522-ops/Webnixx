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
    const [isMuted, setIsMuted] = useState<boolean>(false)

    const handleToggleMute = async () => {
        if (!call) return
        try {
            if (isMuted) {
                await call.microphone.enable()
                setIsMuted(false)
            } else {
                await call.microphone.disable()
                setIsMuted(true)
            }
        } catch (err) {
            console.error('Error toggling mute:', err)
        }
    }
    useEffect(() => {
        if (!client) return

        const myCall = client.call(callType, callId)
        setCall(myCall)

        myCall.camera.disable()
        myCall.microphone.disable()
        myCall.join({ create: true }).then(
            async () => {
                setCall(myCall)
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                    stream.getTracks().forEach(t => t.stop()) // release it
                    await myCall.camera.enable()
                    await myCall.microphone.enable()
                } catch (err) {
                    console.error('Device error:', err)
                }
            },
            () => console.error("Failed to join the call"),
        )

        return () => {
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
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
            />
        </StreamCall>
    )
}

export default CustomLivestreamPlayer
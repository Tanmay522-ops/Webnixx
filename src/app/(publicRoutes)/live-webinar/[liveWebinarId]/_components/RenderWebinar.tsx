"use client"
import React, { useEffect } from 'react'
import { User, WebinarStatusEnum } from '@prisma/client'
import WebinarUpcomingState from './UpcomingWebinar/WebinarUpcomingState'
import { usePathname, useRouter } from 'next/navigation'
import { useAttendeeStore } from '@/store/useAttendeeStore'
import { toast } from 'sonner'
import LiveStreamState from './LiveWebinar/LiveStreamState'
import { StreamCallRecording, WebinarWithPresenter } from '@/lib/types'
import Participant from './Participant/Participant'

type Props = {
    error: string | undefined
    user: User | null
    webinar: WebinarWithPresenter
    apiKey: string
    recording: StreamCallRecording | null
}

const RenderWebinar = ({
    error,
    user,
    webinar,
    apiKey,
    recording,
}: Props) => {
    const router = useRouter()
    const pathname = usePathname()

    const { attendee } = useAttendeeStore()

    useEffect(() => {
        if (error) {
            toast.error(error)
            router.push(pathname)
        }
    }, [error])
    return (
        <React.Fragment>
            {webinar.webinarStatus === WebinarStatusEnum.LIVE ? (
                <React.Fragment>
                    {user?.id === webinar.presenterId ? (
                        <LiveStreamState
                            apiKey={apiKey}
                            webinar={webinar}
                            callId={webinar.id}
                            user={user}
                        />
                    ) : attendee ? (
                        <Participant
                            apiKey={apiKey}
                            webinar={webinar}
                            callId={webinar.id}
                        />
                    ) : (
                        <WebinarUpcomingState
                            webinar={webinar}
                            currentUser={user || null}
                        />
                    )}
                </React.Fragment>
            ) : webinar.webinarStatus === WebinarStatusEnum.CANCELLED ? (
                <div className="flex justify-center items-center h-full w-full">
                    <div className="text-center space-y-4">
                        <h3 className="text-2xl font-semibold text-primary">
                            {webinar?.title}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                            This webinar has been cancelled.
                        </p>
                    </div>
                </div>
            ) : webinar.webinarStatus === WebinarStatusEnum.ENDED ? (
                recording?.url ? (
                    <div className="flex justify-center items-center h-full w-full">
                        <div className="text-center space-y-4">
                            <h3 className="text-2xl font-semibold text-primary">
                                {webinar?.title}
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                This webinar has ended.
                            </p>
                            <div className="flex flex-col items-center space-y-2">
                                <p className="text-sm font-medium">Watch the recording:</p>
                                <video
                                    src={recording.url}
                                    controls
                                    className="w-full max-w-2xl rounded-lg border border-border"
                                />
                                <a
                                    href={recording.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary underline"
                                >
                                    Download Recording
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full w-full">
                        <div className="text-center space-y-4">
                            <h3 className="text-2xl font-semibold text-primary">
                                {webinar?.title}
                            </h3>
                            <p className="text-muted-foreground text-xs">
                               This webinar has ended. No recording is available.
                            </p>
                        </div>
                    </div>
                )
            ) : (
                <WebinarUpcomingState
                webinar={webinar}
                currentUser={user || null}
                />
            )}
        </React.Fragment >
    )
}

export default RenderWebinar
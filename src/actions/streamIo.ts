"use server"
import { prismaClient } from '@/lib/prismaClient'
import { getStreamClient } from '@/lib/stream/streamClient'
import { Attendee, Webinar } from '@prisma/client'
import { UserRequest } from '@stream-io/node-sdk'


export const getStreamIoToken = async (attendee: Attendee | null) => {
    try {
        const newUser: UserRequest = {
            id: attendee?.id || 'guest',
            role: 'user', 
            name: attendee?.name || 'Guest',
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${attendee?.name || 'Guest'
                }`,
        }

        await getStreamClient.upsertUsers([newUser])
        // validity is optional (by default the token is valid for an hour)
        const validity = 60 * 60
        const token = getStreamClient.generateUserToken({
            user_id: attendee?.id || 'guest',
            validity_in_seconds: validity,
        })

        return token
    } catch (error) { 
        console.error('Error generating Stream Io token:', error)
        throw new Error('Failed to generate Stream Io token')
    }
}

export const getTokenForHost = async ({
    userId,
    username,
    profilePic,
}: {
    userId: string
    username: string
    profilePic: string
}) => {
    try {
        const newUser: UserRequest = {
            id: userId,
            role: 'user',
            name: username || 'Guest',
            image:
                profilePic ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
        }

        await getStreamClient.upsertUsers([newUser])

        const validity = 60 * 60 * 60

        const token = getStreamClient.generateUserToken({
            user_id: userId,
            validity_in_seconds: validity,
        })

        return token
    } catch (error) {
        console.error('Error generating Stream Io token:', error)
        throw new Error('Failed to generate Stream Io token')
    }
}

export const createAndStartStream = async (webinar: Webinar) => {
    try {
        const checkWebinar = await prismaClient.webinar.findMany({
            where: {
                presenterId: webinar.presenterId,
                webinarStatus: 'LIVE',
            },
        })

        if (checkWebinar.length > 0) {
            throw new Error('You already have a live stream running')
        }

        const call = getStreamClient.video.call('livestream', webinar.id)
        await call.getOrCreate({
            data: {
                // starts_at: new Date(webinar.startTime),
                created_by_id: webinar.presenterId,
                members: [
                    {
                        user_id: webinar.presenterId,
                        role: 'host',
                    },
                ],
            },
        })

        await call.goLive({
            start_recording: true,         
            start_transcription: true,     
        })

        console.log("Stream created and started successfully")
    } catch (error) {
        console.error('Error creating and starting stream:', error)
        throw new Error('Failed to create and start stream')
     }
}

export const getStreamRecording = async (webinarId: string) => {
    try {
        const call = getStreamClient.video.call('livestream', webinarId)

        const recordings = await call.listRecordings()

        if (!recordings || recordings.recordings.length === 0) {
            throw new Error('No recordings found for this webinar')
        }

        return recordings.recordings
    } catch (error) {
        console.error('Error fetching stream recordings:', error)
        throw new Error('Failed to get stream recordings')
    }
}
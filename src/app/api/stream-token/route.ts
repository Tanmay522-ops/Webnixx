// app/api/stream-token/route.ts
import { StreamClient } from '@stream-io/node-sdk'
import { NextResponse } from 'next/server'

const serverClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    process.env.STREAM_SECRET!
)

export async function GET() {
    // Use the hardcoded Stream user ID from your .env
    const userId = process.env.NEXT_PUBLIC_STREAM_USER_ID!

    // Create/sync user in Stream
    await serverClient.upsertUsers([{
        id: userId,
        name: 'Host User',
        role: 'admin',
    }])

    // Generate token for that Stream user
    const token = serverClient.generateUserToken({
        user_id: userId,
        validity_in_seconds: 60 * 60,
    })

    console.log('✅ Stream userId:', userId)
    console.log('✅ Token:', token)

    return NextResponse.json({ token, userId })
}
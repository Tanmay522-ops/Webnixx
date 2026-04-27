"use client"

import { WebinarWithPresenter } from '@/lib/types'
import React from 'react'

type Props = {
    userName?: string
    assistantId: string
    assistantName?: string
    callTimeLimit?: number
    webinar: WebinarWithPresenter
    userId: string
}

const CallStatus = {
    CONNECTING: 'CONNECTING',
    ACTIVE: 'ACTIVE',
    FINISHED: 'FINISHED',
}

const AutoConnectCall = (props: Props) => {
    return <div>AutoConnectCall</div>
}

export default AutoConnectCall
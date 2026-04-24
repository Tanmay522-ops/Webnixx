import React from 'react'

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    rtmpURL: string
    streamKey: string
}

const ObsDialogBox = ({ open, onOpenChange, rtmpURL, streamKey }: Props) => {
    return (
        <div>ObsDialogBox</div>
    )
}

export default ObsDialogBox
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { WebinarWithPresenter } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


type Props = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: React.ReactNode
    webinar: WebinarWithPresenter   
    userId: string
}

const CTADialogBox = ({
    open,
    onOpenChange,
    trigger,
    webinar,
    userId,
}: Props) => {
    const router = useRouter()
    const[loading,setLoading] = useState(false)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className="sm:max-w-md bg-card text-card-foreground border-border">
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        {webinar?.ctaType === "BOOK_A_CALL" ? "Book a Call" : "Buy Now"}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        {webinar?.ctaType === "BOOK_A_CALL"
                            ? "You will be redirected to a call on another page"
                            : "You will be redirected to checkout"}
                    </p>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default CTADialogBox
import React from "react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet" 
import { cn } from "@/lib/utils"

type GlassSheetProps = {
    children: React.ReactNode
    trigger: React.ReactNode
    className?: string
    triggerClass?: string
}

const GlassSheet = ({
    children,
    trigger,
    className,
    triggerClass,
}: GlassSheetProps) => {
    return (
        <Sheet>
            <SheetTrigger className={cn(triggerClass)} asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent
                className={cn(
                    "bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl bg-opacity-20 bg-themeGray border-themeGray",
                    className
                )}
            >
                {/* These components satisfy the accessibility requirement */}
                <SheetTitle className="hidden">Menu</SheetTitle>
                <SheetDescription className="hidden">
                    Mobile navigation menu for Webnix.
                </SheetDescription>

                {children}
            </SheetContent>
        </Sheet>
    )
}

export default GlassSheet
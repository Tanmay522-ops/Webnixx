"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SignIn from "../[[...sign-in]]/page";


export default function SignInPage() {
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (searchParams.get("dialog") === "true") {
            setOpen(true);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            {/* your page background/content here */}
            <SignIn open={open} onOpenChange={setOpen} />
        </div>
    );
}
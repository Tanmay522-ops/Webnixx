"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SignUp from "./[[...sign-up]]/page"; // adjust path

export default function SignUpPage() {
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (searchParams.get("dialog") === "true") {
            setOpen(true);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <SignUp open={open} onOpenChange={setOpen} />
        </div>
    );
}
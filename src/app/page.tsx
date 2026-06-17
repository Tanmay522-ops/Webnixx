"use client"
import { Button } from "@/components/ui/button";
import Menu from "./(landing)/_components/navbar/menu";
import { LogOut, MenuIcon } from "lucide-react";
import GlassSheet from "@/components/ReusableComponent/global/glass-sheet";
import CallToAction from "./(landing)/_components/call-to-action";
import DashboardSnippet from "./(landing)/_components/dashboard-snippets";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FooterNewsletter from "./(landing)/_components/Footer/Footer-column";
import Example from "./(landing)/_components/hero/demo";
import Feature108 from "./(landing)/_components/Feature-sections/feature-sections";


export default function LandingPage() {
    const [loginOpen, setLoginOpen] = useState(false);
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.push("/callback"); 
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded || isSignedIn) return null;

    return (
        <>
            <div className="w-full flex justify-between sticky top-0 items-center px-8 py-5 z-50">
                <p className="font-bold text-2xl">Webnix.</p>

                <Menu orientation="desktop" />

                <div className="flex gap-2">
                    {/* ✅ No Link wrapper, just the button */}
                    <Link href="/sign-in">
                        <Button
                            variant="outline"
                            className="bg-themeBlack rounded-2xl flex gap-2"
                        >
                            <LogOut />
                            Login
                        </Button>
                    </Link>

                    <GlassSheet
                        triggerClass="lg:hidden"
                        trigger={
                            <Button
                                variant="ghost"
                                className="hover:bg-transparent"
                            >
                                <MenuIcon size={30} />
                            </Button>
                        }
                    >
                        <Menu orientation="mobile" />
                    </GlassSheet>
                </div>
            </div>

            <main className="md:px-10 py-20 flex flex-col gap-36">
                <div>
                    <CallToAction />
                    <DashboardSnippet />
                    <Feature108 />
                   <Example/>
                </div>
               <FooterNewsletter/>
            </main>
        </>
    )
}
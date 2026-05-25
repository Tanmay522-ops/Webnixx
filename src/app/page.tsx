import { Button } from "@/components/ui/button";
import Menu from "./(landing)/_components/navbar/menu";
import { LogOut, MenuIcon } from "lucide-react";
import Link from "next/link";
import GlassSheet from "@/components/ReusableComponent/global/glass-sheet";
import CallToAction from "./(landing)/_components/call-to-action";
import DashboardSnippet from "./(landing)/_components/dashboard-snippets";
import dynamic from "next/dynamic";
import Conversation from "./(landing)/_components/conversation";


const PricingSection = dynamic(
    () =>
        import("./(landing)/_components/pricing").then(
            (component) => component.PricingSection,
        ),
    { ssr: true },
)

export default function LandingPage() {
    return (
        <>
        <div className="w-full flex justify-between sticky top-0 items-center px-8 py-5 z-50">
            <p className="font-bold text-2xl">Webnix.</p>

            <Menu orientation="desktop" />

            <div className="flex gap-2">
                <Link href="/sign-in">
                    <Button
                        variant="outline"
                        className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
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
                   <Conversation/>
                </div>
                <PricingSection/>
            </main>
    </>
        
    
    )
}
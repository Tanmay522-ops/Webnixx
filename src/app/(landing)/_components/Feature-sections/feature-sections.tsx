import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    imageAlt: string;
}

interface Tab {
    value: string;
    icon: React.ReactNode;
    label: string;
    content: TabContent;
}

interface Feature108Props {
    badge?: string;
    heading?: string;
    description?: string;
    tabs?: Tab[];
}

const defaultTabs: Tab[] = [
    {
        value: "tab-1",
        icon: <Zap className="h-auto w-4 shrink-0" />,
        label: "Host Webinars",
        content: {
            badge: "Go Live Instantly",
            title: "Create and host webinars that drive real sales.",
            description:
                "Launch professional webinars in minutes. Invite your audience, present your product, and let Webnix handle the rest — from registrations to follow-ups. Built for founders, coaches, and sales teams who want results.",
            buttonText: "Host a Webinar",
            imageSrc: "/image-1.png",
            imageAlt: "Webnix webinar hosting interface",
        },
    },
    {
        value: "tab-2",
        icon: <Pointer className="h-auto w-4 shrink-0" />,
        label: "Join & Engage",
        content: {
            badge: "Seamless Experience",
            title: "Attend webinars and discover products you'll love.",
            description:
                "Join live or recorded webinars from top brands and creators. Ask questions, interact in real time, and get personalized product recommendations — all inside a clean, distraction-free experience.",
            buttonText: "Browse Webinars",
            imageSrc: "/image-2.png",
            imageAlt: "Webnix attendee experience",
        },
    },
    {
        value: "tab-3",
        icon: <Layout className="h-auto w-4 shrink-0" />,
        label: "AI Calling Agent",
        content: {
            badge: "Close on Autopilot",
            title: "Your AI agent calls leads and closes deals for you.",
            description:
                "After every webinar, Webnix's AI calling agent follows up with attendees, answers objections, and convinces them to buy — just like a real sales rep, but available 24/7 at a fraction of the cost.",
            buttonText: "See the AI Agent",
            imageSrc: "/image-3.jpeg",
            imageAlt: "Webnix AI calling agent dashboard",
        },
    },
];

export default function Feature108({
    badge = "webnix.app",
    heading = "The Webinar Platform That Sells While You Sleep",
    description = "Webnix combines live webinars with AI-powered calling agents that convert attendees into paying customers — automatically.",
    tabs = defaultTabs,
}: Feature108Props) {
    return (
        <section className="py-22">
            <div className="container mx-auto">
                <div className="flex flex-col items-center gap-4 text-center">
                    <Badge
                        variant="outline"
                        className="border-[var(--accent-primary)] text-[var(--accent-primary)]"
                    >
                        {badge}
                    </Badge>
                    <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl text-foreground">
                        {heading}
                    </h1>
                    <p className="text-muted-foreground max-w-xl">{description}</p>
                </div>

                <Tabs defaultValue={tabs[0].value} className="mt-8">
                    <TabsList className="container flex flex-row items-center justify-center gap-4 sm:flex-row md:gap-10 bg-transparent">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-all
                                    data-[state=active]:bg-[var(--accent-primary)]/10
                                    data-[state=active]:text-[var(--accent-primary)]
                                    data-[state=active]:border
                                    data-[state=active]:border-[var(--accent-primary)]/40"
                            >
                                {tab.icon} {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 lg:p-16">
                        {tabs.map((tab) => (
                            <TabsContent
                                key={tab.value}
                                value={tab.value}
                                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
                            >
                                <div className="flex flex-col gap-5">
                                    <Badge
                                        variant="outline"
                                        className="w-fit bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/40 text-[var(--accent-primary)]"
                                    >
                                        {tab.content.badge}
                                    </Badge>
                                    <h3 className="text-3xl font-semibold lg:text-5xl text-foreground">
                                        {tab.content.title}
                                    </h3>
                                    <p className="text-muted-foreground lg:text-lg">
                                        {tab.content.description}
                                    </p>
                                    <Button
                                        className="mt-2.5 w-fit gap-2 text-white"
                                        size="lg"
                                        style={{
                                            background: `linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))`,
                                        }}
                                    >
                                        {tab.content.buttonText}
                                    </Button>
                                </div>
                                <img
                                    src={tab.content.imageSrc}
                                    alt={tab.content.imageAlt}
                                    className="rounded-xl border border-border"
                                />
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </section>
    );
}
import { Layout, Pointer, Zap } from "lucide-react";
import Feature108 from "./feature-sections";

const demoData = {
    badge: "webnix.app",
    heading: "The Webinar Platform That Sells While You Sleep",
    description: "Webnix combines live webinars with AI-powered calling agents that convert attendees into paying customers — automatically.",
    tabs: [
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
                imageSrc:
                    "/image-1.png",
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
                imageSrc:
                    "/image-2.png",
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
                imageSrc:
                    "/image-3.png",
                imageAlt: "Webnix AI calling agent dashboard",
            },
        },
    ],
};

export default function Feature108Demo() {
    return <Feature108 {...demoData} />;
}
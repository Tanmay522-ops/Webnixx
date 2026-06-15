"use client"

import GradientText from "@/components/ReusableComponent/global/gradient-text"
import BackdropGradient from "@/components/ReusableComponent/global/backdrop-gradient"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Check, Sparkles } from "lucide-react"

type Props = {}

const plans = [
    {
        title: "Starter",
        price: "$99",
        duration: "/month",
        description: "Perfect for creators and small communities getting started.",
        button: "Start Free Trial",
        popular: false,
        features: [
            "Unlimited community members",
            "Custom branding",
            "Basic analytics dashboard",
            "Community moderation tools",
            "Email support",
        ],
    },
    {
        title: "Pro",
        price: "$199",
        duration: "/month",
        description: "Built for growing businesses and advanced communities.",
        button: "Get Started",
        popular: true,
        features: [
            "Everything in Starter",
            "Advanced analytics",
            "Priority support",
            "Automated workflows",
            "Premium integrations",
        ],
    },
    {
        title: "Enterprise",
        price: "$399",
        duration: "/month",
        description: "Advanced infrastructure for large-scale organizations.",
        button: "Contact Sales",
        popular: false,
        features: [
            "Dedicated account manager",
            "Custom onboarding",
            "Enterprise-grade security",
            "Unlimited integrations",
            "24/7 premium support",
        ],
    },
]

export const PricingSection = (props: Props) => {
    return (
        <section
            className="relative w-full pb-2 overflow-hidden"
            id="pricing"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-purple-500/10 blur-[140px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center">
                {/* Heading */}
                <BackdropGradient className="w-full flex flex-col items-center opacity-100">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 mb-6">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs tracking-[0.2em] uppercase text-purple-300 font-semibold">
                            Flexible Pricing
                        </span>
                    </div>

                    <GradientText
                        className="text-4xl md:text-6xl font-bold text-center leading-tight"
                        element="H2"
                    >
                        Pricing Plans That Scale
                        <br />
                        With Your Community
                    </GradientText>

                    <p className="text-sm md:text-lg text-center mt-5 text-muted-foreground max-w-3xl leading-relaxed mx-auto">
                        Grouple helps creators, startups, and businesses build thriving
                        online communities with powerful collaboration tools and scalable
                        infrastructure.
                    </p>
                </BackdropGradient>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20 w-full">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${plan.popular
                                ? "bg-[#151515] border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.18)]"
                                : "bg-themeBlack border-themeGray"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute top-5 right-5">
                                    <div className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs text-purple-300 font-semibold tracking-wide">
                                        MOST POPULAR
                                    </div>
                                </div>
                            )}

                            <CardContent className="p-8">
                                {/* Plan Header */}
                                <div className="flex flex-col gap-3">
                                    <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
                                        {plan.title}
                                    </span>

                                    <div className="flex items-end gap-1">
                                        <CardTitle className="text-5xl font-bold text-white">
                                            {plan.price}
                                        </CardTitle>

                                        <span className="text-muted-foreground mb-1">
                                            {plan.duration}
                                        </span>
                                    </div>

                                    <CardDescription className="text-[#B4B0AE] text-sm leading-relaxed">
                                        {plan.description}
                                    </CardDescription>

                                    <Link href="#" className="w-full mt-5">
                                        <Button
                                            variant="default"
                                            className={`w-full rounded-2xl py-6 text-sm font-semibold transition-all duration-300 ${plan.popular
                                                ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 text-white"
                                                : "bg-[#333337] hover:bg-white hover:text-black text-white"
                                                }`}
                                        >
                                            {plan.button}
                                        </Button>
                                    </Link>
                                </div>

                                {/* Divider */}
                                <div className="w-full h-px bg-white/10 my-8" />

                                {/* Features */}
                                <div className="flex flex-col gap-4 text-[#B4B0AE]">
                                    <p className="text-sm uppercase tracking-wide text-white font-medium">
                                        What's Included
                                    </p>

                                    {plan.features.map((feature, i) => (
                                        <span
                                            key={i}
                                            className="flex gap-3 items-center text-sm"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                                <Check className="w-3.5 h-3.5 text-purple-400" />
                                            </div>

                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
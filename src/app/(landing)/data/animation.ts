// animations.ts

import gsap from "gsap";

interface AnimationRefs {
    containerRef: React.RefObject<HTMLDivElement | null>;
    badgeRef: React.RefObject<HTMLDivElement | null>;
    headingRef: React.RefObject<HTMLHeadingElement | null>;
    subtitleRef: React.RefObject<HTMLParagraphElement | null>;
    dateRef: React.RefObject<HTMLParagraphElement | null>;
    countdownRef: React.RefObject<HTMLDivElement | null>;
    buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const runHeroAnimations = ({
    containerRef,
    badgeRef,
    headingRef,
    subtitleRef,
    dateRef,
    countdownRef,
    buttonRef,
}: AnimationRefs) => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out",
            },
        });

        tl.from(badgeRef.current, {
            y: -40,
            opacity: 0,
            duration: 0.8,
        })
            .from(
                headingRef.current,
                {
                    y: 80,
                    opacity: 0,
                    duration: 1,
                },
                "-=0.4"
            )
            .from(
                subtitleRef.current,
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                },
                "-=0.5"
            )
            .from(
                dateRef.current,
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.7,
                },
                "-=0.5"
            )
            .from(
                countdownRef.current?.children || [],
                {
                    y: 50,
                    opacity: 0,
                    stagger: 0.12,
                    duration: 0.8,
                },
                "-=0.4"
            )
            .from(
                buttonRef.current,
                {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                },
                "-=0.4"
            )


        gsap.to(buttonRef.current, {
            boxShadow: "0 0 80px rgba(135, 49, 255, 0.75)",
            repeat: -1,
            yoyo: true,
            duration: 1.8,
            ease: "power1.inOut",
        });
    }, containerRef);

    return () => ctx.revert();
};
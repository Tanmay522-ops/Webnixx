"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mic,
  Video,
  Phone,
  MessageSquare,
  Users,
} from "lucide-react";
import { CheckCircle2, Play } from "lucide-react";
import { participants,avatars,bullets } from "../../data/data";
import { runHeroAnimations } from "../../data/animation";
import GradientText from "@/components/ReusableComponent/global/gradient-text";



export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 9,
    minutes: 17,
    seconds: 43,
  });

  // GSAP Refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const dateRef = useRef<HTMLParagraphElement | null>(null);
  const countdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const cleanup = runHeroAnimations({
      containerRef,
      badgeRef,
      headingRef,
      subtitleRef,
      dateRef,
      countdownRef,
      buttonRef,
    });

    return cleanup;
  }, []);

  const fmt = (n: number) => n.toString().padStart(2, "0");

  return (
    <>
      <div
        ref={containerRef}
        className="dark min-h-screen bg-background text-foreground overflow-hidden"
      >
        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-20"
            style={{
              background: "var(--accent-secondary)",
              filter: "blur(140px)",
            }}
          />

          <div
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-15"
            style={{
              background: "var(--accent-primary)",
              filter: "blur(160px)",
            }}
          />
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 flex flex-col items-center">
          {/* Badge */}
          <div ref={badgeRef} className="mb-8">
            <div
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-[0.25em] uppercase"
              style={{
                border: "1px solid rgba(167, 110, 246, 0.4)",
                background: "rgba(135, 49, 255, 0.12)",
                color: "var(--accent-primary)",
              }}
            >
              Exclusive Live Business Webinar
            </div>
          </div>

          {/* Heading */}
              <GradientText
                            className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
                            element="H1"
                        >
              <span className="text-gradient">Master The Future</span>
              <br />
              <span className="text-foreground">
                Of Business Growth
              </span>
                        </GradientText>
         

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-muted-foreground text-base md:text-xl text-center max-w-3xl mb-4 leading-relaxed"
          >
            Exclusive live webinar will equip you with actionable insights,
            tools, and strategies to stay ahead in a rapidly changing market.
          </p>

          {/* Date */}
          <p
            ref={dateRef}
            className="text-sm md:text-base font-semibold mb-12"
            style={{ color: "var(--accent-primary)" }}
          >
            Live on October 28, 2025 · 7:00 PM PST · Seats are limited
          </p>

          {/* Countdown */}
          <div
            ref={countdownRef}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-14"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-2xl px-7 py-5 min-w-[110px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(167,110,246,0.2)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="text-5xl font-bold tabular-nums leading-none mb-2"
                  style={{
                    fontFamily: "var(--font-manrope)",
                    color: "var(--accent-primary)",
                  }}
                >
                  {fmt(value)}
                </span>

                <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            ref={buttonRef}
            className="relative px-10 py-4 rounded-2xl font-bold text-white text-lg overflow-hidden group mb-20 transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))",
              boxShadow: "0 0 50px rgba(135, 49, 255, 0.45)",
            }}
          >
            <span className="relative z-10">
              Register Now — Save Your Seat
            </span>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "rgba(255,255,255,0.08)",
              }}
            />
          </button>

          {/* Webinar Mockup */}
          <div
            className="w-full max-w-6xl rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(167,110,246,0.15)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>

              <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-wide">
                Business Growth Webinar · 2025
              </span>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Users size={15} />
                <span className="text-xs md:text-sm">247</span>
              </div>
            </div>

            {/* Participants */}
            <div className="hidden md:p-6 md:p-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {participants.map((p) => (
                <div
                  key={p.initials}
                  className={`relative aspect-video rounded-2xl overflow-hidden flex items-end justify-start p-4 min-h-[180px]`}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: p.speaking
                      ? "1px solid var(--accent-primary)"
                      : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold text-xl shadow-2xl`}
                    >
                      {p.initials}
                    </div>
                  </div>

                  <div
                    className="relative z-10 px-3 py-1 rounded-md text-xs font-medium text-white flex items-center gap-1.5"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {p.speaking && (
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                          background: "var(--accent-primary)",
                        }}
                      />
                    )}

                    {p.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Controls */}
            <div
              className=" hidden md:flex items-center justify-center gap-4 py-5"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                {
                  icon: <Mic size={18} />,
                  label: "Mute",
                },
                {
                  icon: <Video size={18} />,
                  label: "Video",
                },
                {
                  icon: <MessageSquare size={18} />,
                  label: "Chat",
                },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  {icon}

                  <span className="text-[10px] font-medium">
                    {label}
                  </span>
                </button>
              ))}

              <button
                className="flex flex-col items-center gap-1 px-6 py-3 rounded-xl font-medium text-white transition-transform hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))",
                }}
              >
                <Phone size={18} />

                <span className="text-[10px]">
                  Join
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="dark min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-manrope, 'Inter', sans-serif)" }}>
          {/* Ambient glow blobs */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full"
              style={{
                background: "var(--accent-secondary)",
                filter: "blur(140px)",
                opacity: 0.18,
              }}
            />

            <div
              className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full"
              style={{
                background: "var(--accent-primary)",
                filter: "blur(160px)",
                opacity: 0.12,
              }}
            />
          </div>

          {/* Main Container */}
          <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 xl:px-16 py-20">

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-24 items-center">

              {/* ───────────────── LEFT COLUMN ───────────────── */}
              <div className="flex flex-col gap-8">

                {/* Badge */}
                <div className="inline-flex w-fit">
                  <span
                    className="px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase"
                    style={{
                      border: "1px solid rgba(167, 110, 246, 0.45)",
                      background: "rgba(135, 49, 255, 0.1)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    About the Webinar
                  </span>
                </div>

                {/* Headline */}
               

                  <GradientText
                    className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
                    element="H1"
                  >
                    <span className="text-gradient">
                      Redefine How You
                    </span>

                    <br />

                    <span className="text-foreground">
                      Lead, Innovate,
                    </span>

                    <br />

                    <span className="text-foreground">
                      And Grow
                    </span>
                  </GradientText>
              

                {/* Video Thumbnail */}
                <div className="relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1582833507500-9cf7a6d9c831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
                    alt="Webinar presenter"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ height: "380px" }}
                  />

                  {/* Dark Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,8,20,0.75) 0%, rgba(10,8,20,0.15) 60%)",
                    }}
                  />

                  {/* Purple Overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent-secondary), transparent)",
                    }}
                  />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      className="flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        border: "1.5px solid rgba(255,255,255,0.3)",
                        boxShadow: "0 0 40px rgba(135, 49, 255, 0.45)",
                      }}
                    >
                      <Play
                        size={26}
                        fill="white"
                        className="text-white ml-1"
                      />
                    </button>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-5 flex-wrap">

                  {/* Avatar Stack */}
                  <div className="flex -space-x-3">
                    {avatars.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Professional"
                        className="w-11 h-11 rounded-full object-cover"
                        style={{
                          border: "2px solid var(--background)",
                          boxShadow: "0 0 0 1px rgba(167,110,246,0.3)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-sm md:text-base font-bold text-foreground">
                      100+ Professionals Have Already Joined
                    </p>

                    <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-xl">
                      Trusted by entrepreneurs, managers, and innovators who
                      want to build smarter, more agile businesses.
                    </p>
                  </div>
                </div>
              </div>

              {/* ───────────────── RIGHT COLUMN ───────────────── */}
              <div className="flex flex-col gap-8">

                {/* Intro */}
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  The Veo Business Webinar brings together industry
                  professionals, entrepreneurs, and business enthusiasts
                  to explore modern strategies for sustainable growth.
                  Whether you're scaling a startup or transforming an
                  enterprise, this is your edge.
                </p>

                {/* Divider */}
                <div
                  className="w-full h-px"
                  style={{
                    background:
                      "linear-gradient(to right, var(--accent-secondary), transparent)",
                  }}
                />

                {/* Bullet Points */}
                <div className="flex flex-col gap-8">
                  {bullets.map((b, i) => (
                    <div key={i} className="flex gap-5">

                      {/* Icon */}
                      <div className="mt-1 shrink-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(135,49,255,0.1)",
                            border: "1px solid rgba(167,110,246,0.25)",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          <CheckCircle2
                            size={18}
                            style={{
                              color: "var(--accent-primary)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div>
                        <p className="text-base font-semibold text-foreground mb-1">
                          {b.title}
                        </p>

                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {b.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="w-full py-4 rounded-2xl font-bold text-white text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))",
                    boxShadow: "0 4px 32px rgba(135, 49, 255, 0.35)",
                  }}
                >
                  Reserve Your Free Spot →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}
"use client"

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, Users, Video, Star, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-button", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });

      // Floating icons animation
      gsap.to(".floating-icon", {
        y: -20,
        duration: 2,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Product cards scroll animation
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // About section animation
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
        },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
        },
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Popular events animation
      gsap.from(".popular-card", {
        scrollTrigger: {
          trigger: popularRef.current,
          start: "top 75%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
      });

      // Testimonials animation
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">Unmuted</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Solutions</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Meetings</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link className="text-sm text-zinc-400 hover:text-white transition-colors" href="/sign-in">
              Sign In
            </Link>
            <button className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-full text-sm transition-all hover:scale-105">
              Start for Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-full text-sm mb-8">
              <span className="text-zinc-400">HOW DO YOU WEBINAR & MEETINGS</span>
            </div>

            <h1 className="hero-title text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
              Uncover The Ultimate<br />
              Webinar & Meeting Platform.
            </h1>

            <p className="hero-subtitle text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Initiating a business venture may appear overwhelming, yet our forte lies in simplifying the entire process for you.
            </p>

            <button className="hero-button px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-full text-base font-medium hover:scale-105 transition-all inline-flex items-center gap-2 group shadow-lg shadow-violet-600/25">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Floating icons */}
            <div className="floating-icon absolute top-20 -left-10 md:left-0 w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-lg flex items-center justify-center rotate-12">
              <Users className="w-8 h-8 text-violet-400" />
            </div>
            <div className="floating-icon absolute top-40 -right-10 md:right-10 w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-lg flex items-center justify-center -rotate-12">
              <Clock className="w-8 h-8 text-violet-400" />
            </div>
            <div className="floating-icon absolute bottom-10 left-20 w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-lg flex items-center justify-center rotate-6">
              <Video className="w-8 h-8 text-violet-400" />
            </div>
          </div>

          {/* Product Cards */}
          <div ref={cardsRef} className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="product-card bg-zinc-900 rounded-3xl p-6 shadow-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <h3 className="text-lg font-semibold mb-3 text-white">Introduction to Framer and GSAP</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Speaker:</span>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-violet-500 border-2 border-zinc-900" />
                  <div className="w-6 h-6 rounded-full bg-violet-700 border-2 border-zinc-900" />
                </div>
                <span className="ml-2">10:30 AM - 11:30 AM</span>
              </div>
              <span className="inline-block px-3 py-1 bg-violet-600/20 text-violet-400 border border-violet-600/30 rounded-full text-xs font-medium">
                Up next
              </span>
            </div>

            <div className="product-card bg-zinc-900 rounded-3xl p-6 shadow-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <h3 className="text-lg font-semibold mb-3 text-white">Five-session Up: Finance Dashboard</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Speaker:</span>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-violet-500 border-2 border-zinc-900" />
                  <div className="w-6 h-6 rounded-full bg-violet-700 border-2 border-zinc-900" />
                  <div className="w-6 h-6 rounded-full bg-zinc-600 border-2 border-zinc-900" />
                </div>
                <span className="ml-2">02:30 PM - 03:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-6 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="about-content">
              <span className="inline-block px-4 py-2 bg-violet-600/20 text-violet-400 border border-violet-600/30 rounded-full text-sm font-medium mb-6">
                BUY TICKET
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                About This<br />Webinar
              </h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                This webinar is a comprehensive introduction to the powerful Framer design and development. In this webinar, you'll learn the basics of Framer and GSAP, including how to use GSAP with Framer and Webflow.
              </p>
              <button className="inline-flex items-center gap-2 text-violet-400 font-medium hover:gap-3 transition-all hover:text-violet-300">
                Learn More
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="about-image">
              <div className="relative bg-zinc-800 rounded-3xl p-8 aspect-[4/3] border border-zinc-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-violet-600/10 to-violet-900/10 rounded-3xl flex items-center justify-center">
                    <Video className="w-20 h-20 text-violet-600/40" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-zinc-900 border border-zinc-700 rounded-2xl p-4 shadow-xl">
                  <div className="text-xs text-zinc-500 mb-1">Speaker</div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-violet-600" />
                    <div>
                      <div className="font-semibold text-sm text-white">Introducing to Framer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section ref={popularRef} className="py-20 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Browse our popular<br />events online.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="popular-card bg-zinc-900 rounded-2xl overflow-hidden shadow-md border border-zinc-800 group cursor-pointer hover:border-violet-600/50 hover:shadow-violet-600/10 hover:shadow-xl transition-all">
                <div className="aspect-square bg-gradient-to-br from-violet-600/15 to-violet-900/10 flex items-center justify-center">
                  <Users className="w-12 h-12 text-violet-500/50 group-hover:text-violet-400 transition-colors" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm mb-1 text-white">Design Workshop {i}</h4>
                  <p className="text-xs text-zinc-500">March 15, 2024</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-full inline-flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-violet-600/25">
              See All Events
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-20 px-6 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-sm text-zinc-500 mb-2">Testimonials</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">What they say</h2>
          </div>

          <div className="testimonial-card max-w-3xl mx-auto bg-zinc-800 rounded-3xl p-8 md:p-12 shadow-xl border border-zinc-700">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-violet-500 text-violet-500" />
              ))}
            </div>
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-zinc-300">
              "Nature and pricing were very good. Keeps us and our customers delighted with quick turnarounds on what we do. Queues unravel quicker in work. It was just so much better than how the Queues run in earlier projects. Quis rutrum cursus amet, at dolor pharetra."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-violet-600" />
              <div>
                <div className="font-semibold text-white">Kathryn Gunawan</div>
                <div className="text-sm text-zinc-400">Product Designer, Google</div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              <button className="w-2 h-2 rounded-full bg-violet-500" />
              <button className="w-2 h-2 rounded-full bg-zinc-600 hover:bg-violet-500 transition-colors" />
              <button className="w-2 h-2 rounded-full bg-zinc-600 hover:bg-violet-500 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-violet-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-900 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to transform your<br />meetings & webinars?
          </h2>
          <p className="text-lg mb-8 text-violet-200">
            Join thousands of companies using our platform to engage their audience.
          </p>
          <button className="px-8 py-4 bg-white text-violet-700 rounded-full text-base font-medium hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-xl hover:shadow-2xl">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">Unmuted</span>
            </div>
            <p className="text-sm text-zinc-500">
              © 2024 Unmuted. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
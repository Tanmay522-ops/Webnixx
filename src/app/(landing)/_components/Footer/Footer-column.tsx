'use client';

import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const footerColumns = [
    {
        title: 'Product',
        links: [
            'Host a Webinar',
            'Join a Webinar',
            'AI Calling Agent',
            'Analytics Dashboard',
            'Integrations',
        ],
    },
    {
        title: 'Resources',
        links: ['Documentation', 'Case Studies', 'Blog', 'Sales Playbook', 'Community'],
    },
    {
        title: 'Company',
        links: ['About Us', 'Careers', 'Contact', 'Partners', 'Press'],
    },
];

const legalLinks = [
    'Terms of Service',
    'Privacy Policy',
    'Cookie Settings',
    'Accessibility',
];

const socialIcons = [
    { icon: <Instagram className="h-5 w-5" />, href: '#' },
    { icon: <Twitter className="h-5 w-5" />, href: '#' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#' },
    { icon: <Youtube className="h-5 w-5" />, href: '#' },
];

export default function FooterNewsletter() {
    return (
        <footer className="relative w-full pt-20 pb-10">
            {/* Accent blobs */}
            <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
                <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full opacity-20 blur-3xl bg-[var(--accent-primary)]" />
                <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full opacity-15 blur-3xl bg-[var(--accent-secondary)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Newsletter card */}
                <div className="mb-16 rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 md:p-12">
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="mb-4 text-2xl font-bold md:text-3xl text-foreground">
                                Turn your next webinar into your biggest sales day.
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Join thousands of founders and sales teams using Webnix to host
                                webinars and let AI close deals for them — around the clock.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your work email"
                                    className="rounded-lg border border-border bg-input/10 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-[var(--accent-primary)] focus:outline-none"
                                />
                                <button
                                    className="rounded-lg px-6 py-3 font-medium transition text-white shadow-lg"
                                    style={{
                                        background: `linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))`,
                                        boxShadow: `0 4px 24px oklch(0.66 0.1972 300.41 / 0.3)`,
                                    }}
                                >
                                    Get Early Access
                                </button>
                            </div>
                        </div>
                        <div className="hidden justify-end md:flex">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 rotate-6 rounded-xl opacity-40"
                                    style={{ background: `var(--accent-primary)` }}
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=240&q=80"
                                    alt="Webnix webinar platform"
                                    className="relative w-80 rounded-xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer columns */}
                <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2 lg:col-span-1">
                        <div className="mb-6 flex items-center space-x-2">
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-full"
                                style={{ background: `linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))` }}
                            >
                                {/* Webinar / broadcast icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-foreground">Webnix.</span>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            The webinar platform powered by AI — host, engage, and let your
                            AI calling agent close deals while you focus on growth.
                        </p>
                        <div className="flex space-x-4">
                            {socialIcons.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:border-[var(--accent-primary)] transition"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerColumns.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-4 text-lg font-semibold text-foreground">{col.title}</h4>
                            <ul className="space-y-3">
                                {col.links.map((text) => (
                                    <li key={text}>
                                        <a
                                            href="#"
                                            className="text-muted-foreground hover:text-foreground transition"
                                        >
                                            {text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
                    <p className="text-muted-foreground mb-4 text-sm md:mb-0">
                        © 2025 Webnix. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {legalLinks.map((text) => (
                            <a
                                key={text}
                                href="#"
                                className="text-muted-foreground hover:text-foreground text-sm transition"
                            >
                                {text}
                            </a>
                        ))}
                    </div>
                </div >
            </div >
        </footer >
    );
}
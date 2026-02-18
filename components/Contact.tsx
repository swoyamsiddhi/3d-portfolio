"use client";

import React, { useState } from "react";

const socials = [
    { label: "GITHUB", href: "https://github.com/swoyamsiddhi" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/swoyam-siddhi-pattanayak-b4b523391/" },
    { label: "X", href: "https://x.com/siddhi_swoyam" },
    { label: "RESUME", href: "#" },
];

export default function Contact() {
    const [email, setEmail] = useState("");

    return (
        <footer className="relative w-full bg-black text-white overflow-hidden rounded-[2rem] mx-2 my-2">
            {/* ─── TOP INFORMATION GRID ─── */}
            <div className="w-full px-8 md:px-16 lg:px-20 pt-20 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* ── LEFT AREA: Contact + Details ── */}
                    <div className="lg:col-span-6 xl:col-span-7">
                        {/* Label */}
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-6">
                            Let&apos;s Talk
                        </span>

                        {/* Main Email Heading */}
                        <a
                            href="mailto:hello@swoyam.ai"
                            className="group inline-block"
                        >
                            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight border-b-4 border-white pb-3 transition-colors duration-300 group-hover:text-white/70">
                                hello@<span className="italic">swoyam</span>.ai
                            </h2>
                        </a>

                        {/* Details Grid */}
                        <div className="grid grid-cols-3 gap-6 mt-12">
                            <div>
                                <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">
                                    Role
                                </span>
                                <span className="font-sans text-sm text-white/80">
                                    AI Infra Engineer
                                </span>
                            </div>
                            <div>
                                <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">
                                    Location
                                </span>
                                <span className="font-sans text-sm text-white/80">
                                    Chennai, India
                                </span>
                            </div>
                            <div>
                                <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">
                                    Availability
                                </span>
                                <span className="font-sans text-sm text-white/80">
                                    Open for 2026
                                </span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-14">
                            <p className="font-sans text-xs text-white/40 uppercase tracking-[0.2em] mb-4">
                                Join my network for updates!
                            </p>
                            <div className="relative w-full max-w-md">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full bg-transparent border-b border-white/30 pb-3 pt-1 text-sm font-sans text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                                />
                                <button
                                    className="absolute right-0 bottom-3 text-white/50 hover:text-white transition-colors"
                                    aria-label="Subscribe"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── CENTER-RIGHT: Social Buttons ── */}
                    <div className="lg:col-span-3 xl:col-span-3 flex flex-col items-start lg:items-center gap-3 pt-2">
                        {socials.map((s, i) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/40 px-7 py-2.5 text-xs font-sans uppercase tracking-[0.2em] text-white/80 hover:bg-white hover:text-black transition-all duration-300"
                                style={{
                                    marginLeft: i % 2 === 0 ? "0" : "1.5rem",
                                }}
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>

                    {/* ── FAR RIGHT: Misc & Accent ── */}
                    <div className="lg:col-span-3 xl:col-span-2 flex flex-col items-start lg:items-end gap-4 text-right pt-2">
                        <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors">
                            Terms & Conditions
                        </a>
                        <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors">
                            Cookies
                        </a>
                        <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors">
                            View Archive!
                        </a>

                        {/* Down arrow */}
                        <span className="text-white/20 text-2xl mt-4">↓</span>

                        {/* Red accent block */}
                        <div className="mt-2 bg-red-600 px-3 py-1.5 rounded-sm">
                            <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white font-bold">
                                2026
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── MASSIVE FOOTER NAME ─── */}
            <div className="relative w-full px-8 md:px-16 lg:px-20 pb-8 pt-4">
                {/* Copyright (positioned in the bottom-right) */}
                <div className="absolute right-8 md:right-16 lg:right-20 bottom-12 md:bottom-16 text-right z-10">
                    <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30 leading-relaxed">
                        © SWOYAM 2026
                        <br />
                        ALL RIGHTS RESERVED
                    </p>
                </div>

                {/* Giant name */}
                <h1
                    className="font-serif font-bold text-white leading-[0.85] select-none"
                    style={{
                        fontSize: "clamp(6rem, 20vw, 22rem)",
                        letterSpacing: "-0.03em",
                    }}
                >
                    <span className="italic">S</span>woyam.
                </h1>
            </div>

            {/* Thin border line at absolute bottom */}
            <div className="w-full h-px bg-white/5" />
        </footer>
    );
}

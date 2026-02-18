"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const blocks = [
    {
        number: "01",
        title: "Current Stack",
        skills: ["C++", "Python", "HTML / CSS / Tailwind", "GSAP / UI Animation"],
    },
    {
        number: "02",
        title: "Core Focus",
        skills: ["Data Structures", "Algorithms", "Git / GitHub", "Object-Oriented Programming"],
    },
    {
        number: "03",
        title: "AI Infra Roadmap",
        skills: ["Linear Algebra", "Machine Learning Foundations", "System Architecture"],
    },
];

export default function StackRoadmap() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!panelRef.current || !triggerRef.current) return;

            // 4 panels total: 1 header + 3 blocks
            const totalPanels = 4;
            const scrollDistance = (totalPanels - 1) * 100; // vw units

            // Header shows first (x: 0). Scroll reveals 01→02→03 from the right.
            gsap.to(panelRef.current, {
                x: `-${scrollDistance}vw`,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 0.8,
                    start: "top top",
                    end: `+=${window.innerHeight * 3}`,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="stack-roadmap"
            className="relative z-[1] bg-[#f8f9fa] overflow-hidden rounded-3xl mx-2 my-2"
        >
            {/* Trigger — gets pinned */}
            <div ref={triggerRef} className="relative w-full h-screen overflow-hidden">
                {/* Sliding panel row */}
                <div
                    ref={panelRef}
                    className="flex h-screen"
                    style={{ width: `${4 * 100}vw` }}
                >
                    {/* ═══ PANEL 0 — Header ═══ */}
                    <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-center px-12 md:px-20 lg:px-28">
                        {/* Label */}
                        <span className="block font-sans text-xs uppercase tracking-[0.35em] text-gray-500 mb-6">
                            04 // Technical Foundation
                        </span>

                        {/* Massive heading */}
                        <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.9] text-black font-bold mb-8">
                            Current Stack &amp;
                            <br />
                            <span className="italic">Trajectory</span>
                        </h2>

                        {/* Subtext */}
                        <p className="font-sans text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
                            Building a rigorous foundation in computer science
                            core while actively charting a course toward AI
                            Infrastructure and Machine Learning.
                        </p>

                        {/* Scroll cue */}
                        <div className="flex items-center gap-3 mt-12">
                            <div className="w-10 h-px bg-black/20" />
                            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400">
                                Scroll to explore →
                            </span>
                        </div>
                    </div>

                    {/* ═══ PANELS 1–3 — Block Columns ═══ */}
                    {blocks.map((block) => (
                        <div
                            key={block.number}
                            className="w-screen h-screen flex-shrink-0 flex items-center border-l border-black/10"
                        >
                            <div className="w-full px-12 md:px-20 lg:px-28 max-w-3xl">
                                {/* Block header */}
                                <div className="mb-12 md:mb-16">
                                    <div className="flex items-baseline gap-5 mb-2">
                                        <span className="font-serif text-7xl md:text-8xl text-black/20 leading-none font-bold">
                                            {block.number}
                                        </span>
                                        <h3 className="font-serif text-3xl md:text-5xl italic text-black font-semibold">
                                            {block.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Skill items */}
                                <ul>
                                    {block.skills.map((skill) => (
                                        <li
                                            key={skill}
                                            className="group border-b border-black/5 last:border-b-0"
                                        >
                                            <div className="flex items-center gap-4 py-6 cursor-default transition-colors duration-200">
                                                {/* Red dot on hover */}
                                                <span className="w-2 h-2 rounded-full bg-[#FF2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />

                                                {/* Skill name */}
                                                <span className="font-mono text-lg md:text-xl text-gray-600 group-hover:text-black transition-colors duration-200 tracking-wide font-medium">
                                                    {skill}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Column accent */}
                                <div className="mt-12 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A]" />
                                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400">
                                        Domain {block.number}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


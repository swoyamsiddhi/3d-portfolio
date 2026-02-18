"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const columns = [
    {
        number: "01",
        title: "Intelligence",
        subtitle: "Machine Learning",
        skills: ["PyTorch", "Neural Networks", "Predictive Modeling", "Data Pipelines"],
    },
    {
        number: "02",
        title: "Infrastructure",
        subtitle: "Systems & Backend",
        skills: ["System Design", "Docker & Containers", "AWS / Cloud", "Scalable Architecture"],
    },
    {
        number: "03",
        title: "Core",
        subtitle: "Languages & Tools",
        skills: ["C++", "Python", "Git Version Control", "Bash / Shell"],
    },
];

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!panelRef.current || !triggerRef.current) return;

            // Total panels = header panel + 3 skill columns = 4 panels
            // Scroll 3 panels worth of width to traverse all
            const totalPanels = 4;
            const scrollDistance = (totalPanels - 1) * 100; // in vw

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
            id="skills"
            className="relative bg-[#f8f9fa] overflow-hidden"
        >
            {/* Trigger container — this gets pinned */}
            <div ref={triggerRef} className="relative w-full h-screen overflow-hidden">
                {/* Sliding panel container — moves from right to left */}
                <div
                    ref={panelRef}
                    className="flex h-screen"
                    style={{ width: `${4 * 100}vw` }}
                >
                    {/* ═══════════════════════════════════
                        PANEL 0 — Section Header
                     ═══════════════════════════════════ */}
                    <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-center px-12 md:px-20 lg:px-28">
                        {/* Label */}
                        <span className="block font-sans text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-6">
                            Capabilities &amp; Stack
                        </span>

                        {/* Massive heading */}
                        <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.9] text-black mb-8">
                            <span className="italic">Technical</span>
                            <br />
                            Architecture
                        </h2>

                        {/* Subtext */}
                        <p className="font-sans text-sm md:text-base text-gray-400 max-w-md leading-relaxed">
                            A structured overview of the engineering stack —
                            scroll horizontally to explore each domain.
                        </p>

                        {/* Scroll cue */}
                        <div className="flex items-center gap-3 mt-12">
                            <div className="w-10 h-px bg-black/20" />
                            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gray-300">
                                Scroll to explore →
                            </span>
                        </div>
                    </div>

                    {/* ═══════════════════════════════════
                        PANELS 1–3 — Skill Columns
                     ═══════════════════════════════════ */}
                    {columns.map((col, i) => (
                        <div
                            key={col.number}
                            className={`skill-col-${i} w-screen h-screen flex-shrink-0 flex items-center border-l border-black/10`}
                        >
                            <div className="w-full px-12 md:px-20 lg:px-28 max-w-3xl">
                                {/* Column header */}
                                <div className="col-title mb-12 md:mb-16">
                                    <div className="flex items-baseline gap-5 mb-2">
                                        <span className="font-serif text-7xl md:text-8xl text-black/10 leading-none">
                                            {col.number}
                                        </span>
                                        <div>
                                            <h3 className="font-serif text-3xl md:text-4xl italic text-black">
                                                {col.title}
                                            </h3>
                                            <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-2">
                                                {col.subtitle}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Skill items */}
                                <ul>
                                    {col.skills.map((skill) => (
                                        <li
                                            key={skill}
                                            className="skill-item group border-b border-black/5 last:border-b-0"
                                        >
                                            <div className="flex items-center gap-4 py-6 cursor-default transition-colors duration-200">
                                                {/* Red dot */}
                                                <span className="w-2 h-2 rounded-full bg-[#FF2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />

                                                {/* Skill name */}
                                                <span className="font-mono text-base md:text-lg text-gray-400 group-hover:text-black transition-colors duration-200 tracking-wide">
                                                    {skill}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Column accent */}
                                <div className="mt-12 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A]" />
                                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gray-300">
                                        Domain {col.number}
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

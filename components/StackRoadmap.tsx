"use client";

import React, { useRef } from "react";

export default function StackRoadmap() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section
            ref={sectionRef}
            id="stack-roadmap"
            className="relative z-10 bg-[#f8f9fa] overflow-hidden rounded-3xl mx-2 my-2"
        >
            <div className="w-full min-h-screen flex flex-col justify-center px-12 md:px-20 lg:px-28 py-20">
                {/* Label */}
                <span data-anim="fade-up" className="block font-sans text-xs uppercase tracking-[0.35em] text-gray-500 mb-6">
                    04 // Technical Foundation
                </span>

                {/* Massive heading */}
                <h2 data-anim="fade-up-blur" className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.9] text-black font-bold mb-8">
                    Current Stack &amp;
                    <br />
                    <span className="italic">Trajectory</span>
                </h2>

                {/* Subtext */}
                <p data-anim="fade-up" className="font-sans text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
                    Building a rigorous foundation in computer science
                    core while actively charting a course toward AI
                    Infrastructure and Machine Learning.
                </p>

                {/* Tech Stack Tags */}
                <div data-anim="fade-up" className="mt-10 max-w-2xl">
                    <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">
                        Technologies &amp; Skills
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "C++", "Python", "HTML / CSS", "Tailwind",
                            "GSAP", "React", "Next.js", "Git / GitHub",
                            "Data Structures", "Algorithms", "OOP",
                            "Linear Algebra", "ML Foundations", "System Architecture",
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="group px-4 py-2 border border-black/10 rounded-full font-mono text-xs text-gray-500 hover:text-black hover:border-black/30 transition-all duration-200 cursor-default flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

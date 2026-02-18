"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        // Wait for layout to settle before initializing ScrollTrigger
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: "-100vw",
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "2000 top",
                    scrub: 0.6,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            }
        );

        return () => {
            clearTimeout(timer);
            pin.kill();
        };
    }, []);

    return (
        <section className="relative bg-black text-white overflow-hidden">
            {/* Main Scroll Container */}
            <div ref={triggerRef} className="relative h-screen w-screen">
                {/* Global Layout Elements (Absolute to pinned container) */}
                <div className="absolute top-20 left-4 z-50 mix-blend-difference hidden lg:block">
                    <span className="block transform -rotate-90 origin-top-left text-xs font-sans tracking-widest text-white/70">
                        MACHINE LEARNING
                    </span>
                </div>

                <div className="absolute top-20 right-4 z-50 mix-blend-difference hidden lg:block">
                    <span className="block transform rotate-90 origin-top-right text-xs font-sans tracking-widest text-white/70">
                        2026
                    </span>
                </div>

                {/* Section Heading (Absolute to pinned container) */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 mix-blend-difference">
                    <span className="font-serif italic text-2xl text-white/90 tracking-widest border-b border-white/30 pb-1">
                        Selected Works
                    </span>
                </div>

                <div ref={sectionRef} className="flex flex-row w-[200vw] h-screen">

                    {/* Project 01 Layout */}
                    <div className="w-screen h-screen relative flex-shrink-0 flex items-center justify-center p-10 overflow-hidden">

                        {/* Image Container */}
                        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[40vw] h-[80vh] bg-neutral-800 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
                            {/* Project Image */}
                            <div className="w-full h-full bg-[url('/projects/medivault.png')] bg-cover bg-center opacity-60 hover:opacity-100 transition-opacity duration-700"></div>
                        </div>

                        {/* Number 01 */}
                        <div className="absolute bottom-[10vh] left-[35vw] z-20">
                            <span className="font-serif text-[15rem] leading-none text-white mix-blend-overlay opacity-80">01</span>
                        </div>

                        {/* Title */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 z-30 mix-blend-difference">
                            <h2 className="font-serif text-[12vw] leading-[0.85] text-white">
                                Medi <br /> <span className="italic font-light">Vault</span>
                            </h2>
                        </div>

                        {/* Description */}
                        <div className="absolute bottom-20 right-20 max-w-sm z-30">
                            <p className="font-sans text-sm text-gray-300 leading-relaxed text-justify">
                                Stores, analyzes, and compares medical scans with dates.
                                Powered by Gemini 2.5 Flash for medical-grade analysis.
                            </p>
                            <div className="mt-4 flex items-center gap-4">
                                <span className="text-xs border border-white/20 px-2 py-1 rounded-full text-white/60">REACT</span>
                                <span className="text-xs border border-white/20 px-2 py-1 rounded-full text-white/60">GEMINI AI</span>
                                <span className="text-xs border border-white/20 px-2 py-1 rounded-full text-white/60">MEDICAL</span>
                                <a
                                    href="https://github.com/swoyamsiddhi/MEDIVAULT1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto group"
                                    aria-label="View on GitHub"
                                >
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="text-white/50 group-hover:text-white transition-colors duration-200"
                                    >
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>


                    {/* Project 02 Layout */}
                    <div className="w-screen h-screen relative flex-shrink-0 bg-black flex items-center justify-center p-10 overflow-hidden">

                        {/* Images - Staggered */}
                        <div className="absolute left-[15vw] top-[15vh] w-[25vw] h-[50vh] bg-neutral-900 border border-white/10 z-10 grayscale hover:grayscale-0 transition-all duration-700">
                            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-70"></div>
                        </div>

                        <div className="absolute right-[15vw] bottom-[15vh] w-[25vw] h-[50vh] bg-neutral-900 border border-white/10 z-10 grayscale hover:grayscale-0 transition-all duration-700">
                            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-70"></div>
                        </div>

                        {/* Title Centered */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mix-blend-difference">
                            <h2 className="font-serif text-[10vw] text-center leading-none text-white">
                                Predictive <br /> <span className="italic">Models</span>
                            </h2>
                        </div>

                        {/* Number 02 & Description */}
                        <div className="absolute bottom-[10vh] left-[20vw] z-30">
                            <span className="font-serif text-[10rem] leading-none text-white/20 block">02</span>
                            <p className="font-sans text-sm text-gray-400 max-w-xs mt-4">
                                Advanced predictive modeling for financial markets using reinforcement learning agents.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;

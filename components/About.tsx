
import React from "react";

export default function About() {
    return (
        <section
            id="about"
            className="relative z-10 -mt-[50vh] w-full min-h-screen bg-[#f8f9fa] text-black py-20 px-4 md:px-12 flex flex-col justify-center overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
        >
            {/* Top Section */}
            <div className="w-full max-w-[1400px] mx-auto mb-20 md:mb-32 relative">
                <span className="absolute top-0 left-0 text-xs md:text-sm font-sans tracking-wide text-gray-500">
                    • About
                </span>
                <h2 className="font-serif text-4xl md:text-7xl lg:text-8xl leading-[0.9] text-right ml-auto w-full md:w-[85%] lg:w-[70%]">
                    I am an aspiring engineer committed to building scalable,
                    high-performance <span className="italic">AI</span> and{" "}
                    <span className="italic">Machine Learning</span>{" "}
                    infrastructure.
                </h2>
            </div>

            {/* Bottom Section: 3-Column Grid */}
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-end">
                {/* Left Column: Details (Span 4) */}
                <div className="md:col-span-4 flex flex-col justify-between h-auto md:h-full md:min-h-[400px]">
                    <div>
                        <h3 className="font-serif text-4xl md:text-5xl leading-none mb-2">
                            Swoyam Siddhi
                            <br />
                            Pattanayak
                        </h3>
                        <p className="font-sans text-xs md:text-sm text-gray-600 tracking-wide uppercase mt-4">
                            First-Year CSE Student & ML Engineer
                        </p>
                    </div>

                    <div className="mt-12 md:mt-0">
                        <span className="block text-xs text-gray-400 mb-2">
                            (Focus Areas)
                        </span>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-sans text-gray-800 tracking-wide uppercase leading-relaxed">
                            <span>Machine Learning</span>
                            <span className="text-gray-300">•</span>
                            <span>AI Infrastructure</span>
                            <span className="text-gray-300">•</span>
                            <span>System Design</span>
                        </div>
                    </div>
                </div>

                {/* Center Column: Image (Span 4) */}
                <div className="md:col-span-4 flex justify-center items-center">
                    <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-xl group">
                        <img src="/profile.jpg" alt="Swoyam Siddhi Pattanayak" className="object-cover w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

                {/* Right Column: Bio & Button (Span 4) */}
                <div className="md:col-span-4 flex flex-col justify-between h-auto md:h-full md:min-h-[400px] text-left md:text-left">
                    <p className="font-sans text-sm md:text-base leading-relaxed text-gray-800 md:ml-auto max-w-sm mt-8 md:mt-0">
                        Currently a first-year BTech CSE student at SRM KTR. I
                        focus on individualized projects in a fast-paced
                        environment and emphasize scalable backend architecture,
                        aiming for high-impact roles in the AI industry.
                    </p>

                    <div className="flex justify-start md:justify-end mt-12 md:mt-0">
                        <button className="group relative w-16 h-16 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                            <span className="sr-only">Next</span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="group-hover:-rotate-45 transition-transform duration-300 transform"
                            >
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

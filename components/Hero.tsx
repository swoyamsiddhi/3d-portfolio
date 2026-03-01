"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;

// Phase boundaries for progressive loading
const PHASE1_END = 10;   // Load frames 1-10 first → show immediately
const PHASE2_END = 60;   // Load frames 11-60 next → covers first scroll chunk

/** Split a string into an array of single-character spans */
function SplitText({
    text,
    className,
    charClass = "char-span",
    showCursor = true,
}: {
    text: string;
    className?: string;
    charClass?: string;
    showCursor?: boolean;
}) {
    return (
        <span className={className}>
            {text.split("").map((char, i) => (
                <span key={i} className={charClass}>
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
            {showCursor && <span className="typing-cursor">|</span>}
        </span>
    );
}

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    // images[i] is set as soon as frame i+1 finishes loading
    const imagesRef = useRef<(HTMLImageElement | null)[]>(
        Array(FRAME_COUNT).fill(null)
    );
    const [loadedCount, setLoadedCount] = useState(0);
    const [isReady, setIsReady] = useState(false); // true once frame 1 is loaded
    const sequenceRef = useRef({ frame: 0 });

    // ── Render a specific frame to canvas ─────────────────────────────────────
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Find the closest loaded frame at or before the requested index
        let img = imagesRef.current[index];
        if (!img) {
            // Fallback: scan backwards for the nearest loaded frame
            for (let i = index - 1; i >= 0; i--) {
                if (imagesRef.current[i]) {
                    img = imagesRef.current[i];
                    break;
                }
            }
        }
        if (!img) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const cx = (canvas.width - img.width * ratio) / 2;
        const cy = (canvas.height - img.height * ratio) / 2;
        context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    }, []);

    // ── Progressive image loader ───────────────────────────────────────────────
    useEffect(() => {
        let mounted = true;

        const loadFrame = (index: number): Promise<void> =>
            new Promise((resolve) => {
                const img = new Image();
                const frameNumber = (index + 1).toString().padStart(3, "0");
                img.src = `/helmet-frames/ezgif-frame-${frameNumber}.webp`;
                img.onload = () => {
                    if (!mounted) return resolve();
                    imagesRef.current[index] = img;
                    setLoadedCount((c) => c + 1);

                    // Show canvas as soon as frame 0 (frame-001) is ready
                    if (index === 0) {
                        setIsReady(true);
                        const canvas = canvasRef.current;
                        if (canvas) {
                            canvas.width = window.innerWidth;
                            canvas.height = window.innerHeight;
                        }
                        renderFrame(0);
                    }
                    resolve();
                };
                img.onerror = () => resolve(); // don't block on error
            });

        const loadRange = async (start: number, end: number) => {
            const promises: Promise<void>[] = [];
            for (let i = start; i < end; i++) {
                promises.push(loadFrame(i));
            }
            await Promise.all(promises);
        };

        const run = async () => {
            // Phase 1: frames 1-10 (critical — show first frame ASAP)
            await loadRange(0, PHASE1_END);

            // Phase 2: frames 11-60 (cover early scroll region)
            await loadRange(PHASE1_END, PHASE2_END);

            // Phase 3: frames 61-240 (load the rest lazily)
            await loadRange(PHASE2_END, FRAME_COUNT);
        };

        run();

        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Setup GSAP animations (runs once canvas is ready) ─────────────────────
    useEffect(() => {
        if (!isReady || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const sequence = sequenceRef.current;

        const updateDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(Math.round(sequence.frame));
        };

        updateDimensions();

        // Image sequence scroll animation
        gsap.to(sequence, {
            frame: FRAME_COUNT - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "70% bottom",
                scrub: 0.5,
            },
            onUpdate: () => renderFrame(Math.round(sequence.frame)),
        });

        // ── Typewriter Entrance (Scroll Triggered) ────────────────────────────
        const nameChars = nameRef.current?.querySelectorAll(".char-span");
        const taglineChars = taglineRef.current?.querySelectorAll(".char-span");
        const subtitleChars = subtitleRef.current?.querySelectorAll(".char-span");

        const finalNameCursor = nameRef.current?.querySelector(".block:last-child .typing-cursor");
        const taglineCursor = taglineRef.current?.querySelector(".typing-cursor");
        const subtitleCursor = subtitleRef.current?.querySelector(".typing-cursor");

        if (nameChars && nameChars.length > 0) {
            const nameTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "35% top",
                    end: "60% top",
                    scrub: 1,
                },
            });
            nameTl.fromTo(
                nameChars,
                { opacity: 0, y: 30, scale: 0.7, rotateX: -90 },
                { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.05, stagger: 0.03, ease: "back.out(1.7)" }
            );
            if (finalNameCursor) {
                nameTl.fromTo(finalNameCursor, { opacity: 0 }, { opacity: 1, duration: 0.1 }, "<");
            }
        }

        if (taglineChars && taglineChars.length > 0) {
            const taglineTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "35% top",
                    end: "60% top",
                    scrub: 1,
                },
            });
            taglineTl.fromTo(
                taglineChars,
                { opacity: 0, y: 20, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.05, stagger: 0.03, ease: "back.out(1.4)" }
            );
            if (taglineCursor) {
                taglineTl.fromTo(taglineCursor, { opacity: 0 }, { opacity: 1, duration: 0.1 }, "<");
            }
        }

        if (subtitleChars && subtitleChars.length > 0) {
            const subtitleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "35% top",
                    end: "60% top",
                    scrub: 1,
                },
            });
            subtitleTl.fromTo(
                subtitleChars,
                { opacity: 0, y: 15, scale: 0.85 },
                { opacity: 1, y: 0, scale: 1, duration: 0.05, stagger: 0.03, ease: "back.out(1.2)" }
            );
            if (subtitleCursor) {
                subtitleTl.fromTo(subtitleCursor, { opacity: 0 }, { opacity: 1, duration: 0.1 }, "<");
            }
        }

        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [isReady, renderFrame]);

    const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
    const allLoaded = loadedCount === FRAME_COUNT;

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

                {/* Top progress bar — visible until all frames load */}
                {!allLoaded && (
                    <div className="absolute top-0 left-0 right-0 z-50 h-[2px] bg-white/10">
                        <div
                            className="h-full bg-white/60 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}

                {/* Canvas */}
                <div className="absolute inset-0 z-0">
                    <canvas ref={canvasRef} className="h-full w-full object-cover" />
                </div>

                {/* Full-screen overlay shown only until first frame is ready */}
                {!isReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-30">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <p className="text-white/50 text-sm tracking-[0.2em] uppercase font-light">Loading</p>
                        </div>
                    </div>
                )}

                {/* Text Overlay */}
                <div
                    ref={textContainerRef}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none"
                >
                    <h1 ref={nameRef} className="hero-name flex flex-col items-center gap-2">
                        <span className="block">
                            <SplitText text="SWOYAM " showCursor={false} />
                            <span className="italic-accent inline-block">
                                <SplitText text="SIDDHI" showCursor={false} />
                            </span>
                        </span>
                        <span className="block">
                            <SplitText text="PATTANAYAK" />
                        </span>
                    </h1>

                    <h2 ref={taglineRef} className="hero-tagline">
                        <SplitText text="MACHINE LEARNING ENGINEER" />
                    </h2>

                    <p ref={subtitleRef} className="hero-subtitle">
                        <SplitText text="Building intelligence. Designing the future." />
                    </p>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;

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
    const textContainerRef = useRef<HTMLDivElement>(null); // New ref for fading text
    const nameRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Load images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/helmet-frames/ezgif-frame-${frameNumber}.png`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImagesLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Setup Animation
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const sequence = { frame: 0 };

        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img) return;

            context.clearRect(0, 0, canvas.width, canvas.height);

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const cx = (canvas.width - img.width * ratio) / 2;
            const cy = (canvas.height - img.height * ratio) / 2;

            context.drawImage(
                img, 0, 0, img.width, img.height,
                cx, cy, img.width * ratio, img.height * ratio
            );
        };

        const updateDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(Math.round(sequence.frame));
        };

        updateDimensions();

        // --- Image sequence scroll animation ---
        gsap.to(sequence, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "70% bottom", // Matches the 500vh scroll length
                scrub: 0.5,
            },
            onUpdate: () => renderFrame(Math.round(sequence.frame)),
        });

        // ─── Typewriter Entrance (Scroll Triggered) ───
        const nameChars = nameRef.current?.querySelectorAll(".char-span");
        const taglineChars = taglineRef.current?.querySelectorAll(".char-span");
        const subtitleChars = subtitleRef.current?.querySelectorAll(".char-span");

        const finalNameCursor = nameRef.current?.querySelector(".block:last-child .typing-cursor");
        const taglineCursor = taglineRef.current?.querySelector(".typing-cursor");
        const subtitleCursor = subtitleRef.current?.querySelector(".typing-cursor");

        // Name Animation
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
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    duration: 0.05,
                    stagger: 0.03,
                    ease: "back.out(1.7)",
                }
            );

            if (finalNameCursor) {
                // Ensure cursor is visible when text appears
                nameTl.fromTo(finalNameCursor, { opacity: 0 }, { opacity: 1, duration: 0.1 }, "<");
                // Blinking effect separate from scroll? 
                // Creating a separate tween for blinking that starts after nameTl?
                // Hard to do with scrub.
                // We'll just leave opacity 1. 
                // Or maybe the user wanted the cursor to appear?
                // In previous code I had it blinking. 
                // With scrub, "blink" (repeat yoyo) doesn't work well.
                // I'll just fade it in.
            }
        }

        // Tagline Animation
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
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.05,
                    stagger: 0.03,
                    ease: "back.out(1.4)",
                }
            );
            if (taglineCursor) {
                taglineTl.fromTo(taglineCursor, { opacity: 0 }, { opacity: 1, duration: 0.1 }, "<");
            }
        }

        // Subtitle Animation
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
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.05,
                    stagger: 0.03,
                    ease: "back.out(1.2)",
                }
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
    }, [imagesLoaded, images]);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <canvas ref={canvasRef} className="h-full w-full object-cover" />
                </div>

                {!imagesLoaded && (
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

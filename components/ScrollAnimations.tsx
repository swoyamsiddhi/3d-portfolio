"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global scroll-triggered text animations.
 * Add these data attributes to any element to animate it on scroll:
 *
 *   data-anim="fade-up"       — Slide up + fade in
 *   data-anim="fade-up-blur"  — Slide up + fade + blur (editorial reveal)
 *   data-anim="split-rise"    — Rise from below an overflow wall
 *   data-anim="char-fade"     — Subtle letter-by-letter fade (for headings)
 *   data-anim="scale-in"      — Scale from 0.9 + fade
 *   data-anim="slide-right"   — Slide in from left
 *   data-anim="line-draw"     — Draw a line (width 0 → 100%)
 */
export default function ScrollAnimations() {
    useEffect(() => {
        // Wait for DOM to settle
        const timer = setTimeout(() => {
            /* ─── FADE UP ─── */
            ScrollTrigger.batch("[data-anim='fade-up']", {
                onEnter: (batch) =>
                    gsap.fromTo(
                        batch,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.9,
                            ease: "power3.out",
                            stagger: 0.08,
                            overwrite: true,
                        }
                    ),
                start: "top 88%",
                once: true,
            });

            /* ─── FADE UP + BLUR (Editorial) ─── */
            ScrollTrigger.batch("[data-anim='fade-up-blur']", {
                onEnter: (batch) =>
                    gsap.fromTo(
                        batch,
                        { y: 50, opacity: 0, filter: "blur(12px)" },
                        {
                            y: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                            duration: 1.1,
                            ease: "power3.out",
                            stagger: 0.1,
                            overwrite: true,
                        }
                    ),
                start: "top 85%",
                once: true,
            });

            /* ─── SCALE IN ─── */
            ScrollTrigger.batch("[data-anim='scale-in']", {
                onEnter: (batch) =>
                    gsap.fromTo(
                        batch,
                        { scale: 0.92, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 1,
                            ease: "power3.out",
                            stagger: 0.06,
                            overwrite: true,
                        }
                    ),
                start: "top 88%",
                once: true,
            });

            /* ─── SLIDE RIGHT ─── */
            ScrollTrigger.batch("[data-anim='slide-right']", {
                onEnter: (batch) =>
                    gsap.fromTo(
                        batch,
                        { x: -40, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.9,
                            ease: "power3.out",
                            stagger: 0.08,
                            overwrite: true,
                        }
                    ),
                start: "top 88%",
                once: true,
            });

            /* ─── LINE DRAW ─── */
            ScrollTrigger.batch("[data-anim='line-draw']", {
                onEnter: (batch) =>
                    gsap.fromTo(
                        batch,
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            duration: 1.2,
                            ease: "power3.inOut",
                            stagger: 0.15,
                            overwrite: true,
                            transformOrigin: "left center",
                        }
                    ),
                start: "top 90%",
                once: true,
            });

            ScrollTrigger.refresh();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return null; // This component renders nothing — it's purely side-effects
}

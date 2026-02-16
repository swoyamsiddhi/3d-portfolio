"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

/* ── Sparkle star particle ── */
interface Sparkle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
}

let sparkleId = 0;

export default function Navbar() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);
    const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    // Track scroll progress
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Sparkle effect on mousemove
    const handleSparkle = useCallback((e: MouseEvent) => {
        // Monochrome / Silver palette for "Stealth" look
        const colors = [
            "rgba(255, 255, 255, 0.8)",
            "rgba(224, 224, 224, 0.7)",
            "rgba(192, 192, 192, 0.6)",
            "rgba(255, 215, 0, 0.3)", // Subtle hint of gold
        ];

        const newSparkle: Sparkle = {
            id: sparkleId++,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 6 + 2, // Smaller, sharper particles
            color: colors[Math.floor(Math.random() * colors.length)],
        };

        setSparkles((prev) => [...prev.slice(-15), newSparkle]);

        setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
        }, 500);
    }, []);

    // Attach sparkle listener to nav
    useEffect(() => {
        const nav = navRef.current;

        const onMove = (e: MouseEvent) => handleSparkle(e);
        const onEnter = () => setIsHoveringInteractive(true);
        const onLeave = () => setIsHoveringInteractive(false);

        if (nav) {
            nav.addEventListener("mousemove", onMove);
            nav.addEventListener("mouseenter", onEnter);
            nav.addEventListener("mouseleave", onLeave);
        }

        return () => {
            if (nav) {
                nav.removeEventListener("mousemove", onMove);
                nav.removeEventListener("mouseenter", onEnter);
                nav.removeEventListener("mouseleave", onLeave);
            }
        };
    }, [handleSparkle]);

    return (
        <>
            {/* ── Stealth Horizontal Navbar ── */}
            <nav ref={navRef} className="stealth-nav">
                <ul className="stealth-nav__list">
                    {/* Logo as first item */}
                    <li className="stealth-nav__item logo-item">
                        <a href="#" className="stealth-nav__link logo-link">
                            SSP_HUD <span className="logo-ver">v2.0</span>
                        </a>
                    </li>

                    {/* Navigation links separated by dots */}
                    {navLinks.map((link) => (
                        <li key={link.label} className="stealth-nav__item">
                            <span className="stealth-nav__separator">•</span>
                            <a href={link.href} className="stealth-nav__link">
                                {link.label}
                            </a>
                        </li>
                    ))}

                    {/* Scroll Percentage Display */}
                    <li className="stealth-nav__item">
                        <span className="stealth-nav__separator">•</span>
                        <span className="stealth-nav__link" style={{ cursor: 'default', color: '#d4af37' }}>
                            {Math.round(scrollProgress * 100)}%
                        </span>
                    </li>
                </ul>
            </nav>

            {/* ── Sparkle particles ── */}
            {sparkles.map((sparkle) => (
                <div
                    key={sparkle.id}
                    className="sparkle-star"
                    style={{
                        left: sparkle.x,
                        top: sparkle.y,
                        width: sparkle.size,
                        height: sparkle.size,
                        background: sparkle.color,
                        boxShadow: `0 0 ${sparkle.size}px ${sparkle.color}`,
                    }}
                />
            ))}

            {/* Global cursor override style (Crosshair for HUD feel) */}
            {isHoveringInteractive && <style>{`* { cursor: crosshair !important; }`}</style>}
        </>
    );
}

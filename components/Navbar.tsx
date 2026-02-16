"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const navLinks = [
    { label: "Home", href: "#", icon: "⌂" },
    { label: "About", href: "#about", icon: "◈" },
    { label: "Projects", href: "#projects", icon: "◇" },
    { label: "Skills", href: "#skills", icon: "△" },
    { label: "Contact", href: "#contact", icon: "✦" },
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
    const scrollbarRef = useRef<HTMLDivElement>(null);

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
        const colors = [
            "rgba(255, 255, 255, 0.9)",
            "rgba(230, 230, 230, 0.8)",
            "rgba(255, 255, 255, 0.6)",
            "rgba(200, 200, 200, 0.7)",
            "rgba(255, 255, 255, 0.85)",
        ];

        const newSparkle: Sparkle = {
            id: sparkleId++,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
        };

        setSparkles((prev) => [...prev.slice(-12), newSparkle]);

        setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
        }, 600);
    }, []);

    // Attach sparkle listener to nav and scrollbar
    useEffect(() => {
        const nav = navRef.current;
        const scrollbar = scrollbarRef.current;

        const onMove = (e: MouseEvent) => handleSparkle(e);
        const onEnter = () => setIsHoveringInteractive(true);
        const onLeave = () => setIsHoveringInteractive(false);

        if (nav) {
            nav.addEventListener("mousemove", onMove);
            nav.addEventListener("mouseenter", onEnter);
            nav.addEventListener("mouseleave", onLeave);
        }
        if (scrollbar) {
            scrollbar.addEventListener("mousemove", onMove);
            scrollbar.addEventListener("mouseenter", onEnter);
            scrollbar.addEventListener("mouseleave", onLeave);
        }

        return () => {
            if (nav) {
                nav.removeEventListener("mousemove", onMove);
                nav.removeEventListener("mouseenter", onEnter);
                nav.removeEventListener("mouseleave", onLeave);
            }
            if (scrollbar) {
                scrollbar.removeEventListener("mousemove", onMove);
                scrollbar.removeEventListener("mouseenter", onEnter);
                scrollbar.removeEventListener("mouseleave", onLeave);
            }
        };
    }, [handleSparkle]);

    // Click scrollbar to jump to position
    const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const percent = clickY / rect.height;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: percent * docHeight, behavior: "smooth" });
    };

    return (
        <>
            {/* ── Left vertical navbar ── */}
            <nav ref={navRef} className="side-nav">
                {/* Logo */}
                <a href="#" className="side-nav__logo">
                    <span className="side-nav__logo-bracket">[</span>
                    <span className="side-nav__logo-text">S</span>
                    <span className="side-nav__logo-bracket">]</span>
                </a>

                {/* Vertical line separator */}
                <div className="side-nav__line" />

                {/* Nav links */}
                <ul className="side-nav__links">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <a href={link.href} className="side-nav__link" title={link.label}>
                                <span className="side-nav__link-icon">{link.icon}</span>
                                <span className="side-nav__link-label">{link.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Bottom line separator */}
                <div className="side-nav__line" />

                {/* Scroll indicator at bottom */}
                <div className="side-nav__scroll-hint">
                    <span className="side-nav__scroll-percent">
                        {Math.round(scrollProgress * 100)}%
                    </span>
                </div>
            </nav>

            {/* ── Right scrollbar ── */}
            <div
                ref={scrollbarRef}
                className="custom-scrollbar"
                onClick={handleScrollbarClick}
            >
                <div className="custom-scrollbar__track">
                    <div
                        className="custom-scrollbar__thumb"
                        style={{ height: `${Math.max(scrollProgress * 100, 2)}%` }}
                    />
                    <div
                        className="custom-scrollbar__glow"
                        style={{ top: `${scrollProgress * 100}%` }}
                    />
                </div>
                <div className="custom-scrollbar__markers">
                    {[0, 25, 50, 75, 100].map((p) => (
                        <div key={p} className="custom-scrollbar__marker" />
                    ))}
                </div>
            </div>

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
                        boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
                    }}
                />
            ))}

            {/* Global cursor override style */}
            {isHoveringInteractive && <style>{`* { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ctext y='18' font-size='16'%3E✦%3C/text%3E%3C/svg%3E") 12 12, pointer !important; `}</style>}
        </>
    );
}

import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollAnimations from "@/components/ScrollAnimations";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
    title: "3D Portfolio",
    description: "A 3D Portfolio with animated hero section",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Force scroll to top BEFORE React hydrates — prevents pinned sections from overlapping */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
                            window.scrollTo(0, 0);
                        `,
                    }}
                />
            </head>
            <body className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} font-sans bg-black`}>
                <SmoothScroll>
                    <ScrollAnimations />
                    <Navbar />
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}

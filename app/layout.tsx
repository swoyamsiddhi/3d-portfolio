import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

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
            <body className={spaceGrotesk.className}>{children}</body>
        </html>
    );
}

import About from "@/components/About";
import Hero from "@/components/Hero";

export default function Home() {
    return (
        <main className="min-h-screen bg-black">
            <Hero />
            <About />
        </main>
    );
}

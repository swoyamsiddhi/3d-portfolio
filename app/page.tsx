import About from "@/components/About";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import StackRoadmap from "@/components/StackRoadmap";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <main className="min-h-screen bg-black">
            <Hero />
            <About />
            <FeaturedProjects />
            <StackRoadmap />
            <Contact />
        </main>
    );
}

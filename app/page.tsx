import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Cloud from "@/components/Cloud";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      {/* Marco central con líneas verticales finas, estilo Vercel */}
      <div className="mx-auto max-w-6xl divide-y divide-ink-700/70 border-x border-ink-700/70">
        <Hero />
        <About />
        <Stack />
        <Cloud />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}

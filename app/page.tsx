import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Cloud from "@/components/Cloud";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/content";

// Revalida cada 60s para reflejar cambios hechos desde /admin
export const revalidate = 60;

export default async function Home() {
  const { profile, projects, experience } = await getContent();

  return (
    <main>
      <Navbar />
      {/* Marco central con líneas verticales finas */}
      <div className="mx-auto max-w-6xl divide-y divide-ink-700/70 md:border-x md:border-ink-700/70">
        <Hero profile={profile} />
        <About />
        <Stack />
        <Cloud />
        <Projects projects={projects} />
        <Experience items={experience} />
        <Contact profile={profile} />
      </div>
    </main>
  );
}

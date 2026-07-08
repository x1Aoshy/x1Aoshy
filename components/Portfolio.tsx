"use client";

import { useI18n } from "@/lib/i18n";
import type { LocalizedContent } from "@/lib/content";
import LanguageModal from "./LanguageModal";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Stack from "./Stack";
import Cloud from "./Cloud";
import AI from "./AI";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";

export default function Portfolio({ content }: { content: LocalizedContent }) {
  const { lang } = useI18n();
  const { profile, projects, experience } = content[lang];

  return (
    <main>
      <LanguageModal />
      <Navbar />
      {/* Marco central con líneas verticales finas */}
      <div className="mx-auto max-w-6xl divide-y divide-ink-700/70 md:border-x md:border-ink-700/70">
        <Hero profile={profile} />
        <About />
        <Stack />
        <Cloud />
        <AI />
        <Projects projects={projects} />
        <Experience items={experience} />
        <Contact profile={profile} />
      </div>
    </main>
  );
}

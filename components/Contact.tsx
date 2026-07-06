"use client";

import Reveal from "./Reveal";
import type { Profile } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const copy = {
  es: {
    tag: "Contacto",
    title: "¿Construimos algo juntos?",
    body: "Estoy abierto a nuevas oportunidades y colaboraciones. Si tienes un proyecto en mente, escríbeme y hablemos.",
    email: "Enviar email",
    madeWith: (name: string) => (
      <>
        Hecho con <span className="text-ink-200">Next.js</span> +{" "}
        <span className="text-ink-200">Tailwind CSS</span> por{" "}
        <span className="font-medium text-white">{name}</span>
      </>
    ),
  },
  en: {
    tag: "Contact",
    title: "Shall we build something together?",
    body: "I'm open to new opportunities and collaborations. If you have a project in mind, drop me a line and let's talk.",
    email: "Send email",
    madeWith: (name: string) => (
      <>
        Built with <span className="text-ink-200">Next.js</span> +{" "}
        <span className="text-ink-200">Tailwind CSS</span> by{" "}
        <span className="font-medium text-white">{name}</span>
      </>
    ),
  },
} as const;

export default function Contact({ profile }: { profile: Profile }) {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section id="contacto" className="section-container">
      <Reveal>
        <div className="rounded-lg border border-ink-700 bg-ink-900 p-6 text-center sm:p-10 md:p-16">
          <div className="mx-auto flex max-w-xl flex-col items-center">
            <span className="section-tag">{t.tag}</span>
            <h2 className="section-title">{t.title}</h2>
            <p className="text-ink-300">{t.body}</p>

            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                {t.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <footer className="mt-12 flex flex-col items-center gap-2 border-t border-ink-700 pt-8 text-center text-sm text-ink-400 md:mt-16">
        <p>{t.madeWith(profile.name)}</p>
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} — Aoshy Dev
        </p>
      </footer>
    </section>
  );
}

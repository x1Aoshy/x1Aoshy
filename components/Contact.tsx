import Reveal from "./Reveal";
import type { Profile } from "@/lib/data";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contacto" className="section-container">
      <Reveal>
        <div className="rounded-lg border border-ink-700 bg-ink-900 p-8 text-center sm:p-10 md:p-16">
          <div className="mx-auto flex max-w-xl flex-col items-center">
            <span className="section-tag">Contacto</span>
            <h2 className="section-title">¿Construimos algo juntos?</h2>
            <p className="text-ink-300">
              Estoy abierto a nuevas oportunidades y colaboraciones. Si tienes
              un proyecto en mente, escríbeme y hablemos.
            </p>

            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                Enviar email
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

      <footer className="mt-16 flex flex-col items-center gap-2 border-t border-ink-700 pt-8 text-center text-sm text-ink-400">
        <p>
          Hecho con <span className="text-ink-200">Next.js</span> +{" "}
          <span className="text-ink-200">Tailwind CSS</span> por{" "}
          <span className="font-medium text-white">{profile.name}</span>
        </p>
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} — Aoshy Dev
        </p>
      </footer>
    </section>
  );
}

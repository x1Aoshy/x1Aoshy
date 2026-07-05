import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contacto" className="section-container">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-ink-600/50 bg-gradient-to-br from-ink-800 via-ink-800 to-grape-deeper/40 p-10 text-center md:p-16">
          <div
            className="absolute -right-20 -top-20 h-64 w-64 animate-pulse-glow rounded-full bg-blurple/20 blur-[100px]"
            aria-hidden
          />
          <div
            className="absolute -bottom-20 -left-20 h-64 w-64 animate-pulse-glow rounded-full bg-grape/20 blur-[100px]"
            aria-hidden
          />

          <div className="relative">
            <span className="section-tag">Contacto</span>
            <h2 className="section-title">¿Construimos algo juntos?</h2>
            <p className="mx-auto max-w-xl text-ink-300">
              Estoy abierto a nuevas oportunidades y colaboraciones. Si tienes
              un proyecto en mente, escríbeme y hablemos.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:hianchang123@gmail.com"
                className="rounded-xl bg-blurple px-8 py-3.5 font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-blurple-dark"
              >
                ✉️ Enviar email
              </a>
              <a
                href="https://github.com/x1Aoshy"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-ink-500 bg-ink-900/60 px-8 py-3.5 font-semibold text-ink-100 transition-all hover:-translate-y-0.5 hover:border-grape hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center gap-2 border-t border-ink-600/40 pt-8 text-sm text-ink-400">
        <p>
          Hecho con <span className="text-blurple-light">Next.js</span> +{" "}
          <span className="text-blurple-light">Tailwind CSS</span> por{" "}
          <span className="font-semibold text-white">Hian Chang</span>
        </p>
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} — Aoshy Dev
        </p>
      </footer>
    </section>
  );
}

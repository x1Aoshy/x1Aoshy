"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

const copy = {
  es: {
    tag: "Sobre mí",
    title: "Código limpio, nube y buen diseño",
    paragraphs: (
      <>
        <p>
          Soy <strong className="text-white">Hian Chang</strong> (también
          conocido como <span className="text-blurple-light">Aoshy Dev</span>),
          un desarrollador <strong className="text-white">Full Stack Junior</strong>{" "}
          con experiencia práctica en{" "}
          <strong className="text-white">Java, C#, JavaScript y PHP</strong>.
        </p>
        <p>
          He trabajado con servicios de{" "}
          <strong className="text-white">AWS</strong> y{" "}
          <strong className="text-white">Google Cloud</strong> — incluyendo
          Compute Engine y EC2 — además de contenedores y orquestación con{" "}
          <strong className="text-white">Kubernetes</strong>.
        </p>
        <p>
          También tengo habilidades de diseño{" "}
          <strong className="text-white">UI/UX con Figma</strong>, lo que me
          permite cuidar tanto la lógica como la experiencia del usuario.
          Me apasiona crear soluciones eficientes y fáciles de usar.
        </p>
      </>
    ),
    stats: [
      { value: "1+", label: "Año de experiencia" },
      { value: "4", label: "Lenguajes principales" },
      { value: "2", label: "Nubes (AWS & GCP)" },
      { value: "∞", label: "Ganas de aprender" },
    ],
  },
  en: {
    tag: "About me",
    title: "Clean code, cloud and good design",
    paragraphs: (
      <>
        <p>
          I&apos;m <strong className="text-white">Hian Chang</strong> (also
          known as <span className="text-blurple-light">Aoshy Dev</span>), a{" "}
          <strong className="text-white">Junior Full Stack developer</strong>{" "}
          with hands-on experience in{" "}
          <strong className="text-white">Java, C#, JavaScript and PHP</strong>.
        </p>
        <p>
          I&apos;ve worked with <strong className="text-white">AWS</strong> and{" "}
          <strong className="text-white">Google Cloud</strong> services —
          including Compute Engine and EC2 — plus containers and orchestration
          with <strong className="text-white">Kubernetes</strong>.
        </p>
        <p>
          I also have <strong className="text-white">UI/UX design skills
          with Figma</strong>, which lets me care about both the logic and the
          user experience. I love building efficient, easy-to-use solutions.
        </p>
      </>
    ),
    stats: [
      { value: "1+", label: "Year of experience" },
      { value: "4", label: "Main languages" },
      { value: "2", label: "Clouds (AWS & GCP)" },
      { value: "∞", label: "Eagerness to learn" },
    ],
  },
} as const;

export default function About() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section id="sobre-mi" className="section-container">
      <Reveal>
        <span className="section-tag">{t.tag}</span>
        <h2 className="section-title">{t.title}</h2>
      </Reveal>

      <div className="mt-6 grid gap-8 md:mt-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        <Reveal delay={0.1}>
          <div className="space-y-4 text-[15px] leading-relaxed text-ink-300 sm:text-base lg:text-lg">
            {t.paragraphs}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-ink-700">
          {t.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center gap-1 bg-ink-900 p-4 text-center transition-colors hover:bg-ink-850 sm:p-6 ${
                i % 2 === 0 ? "border-r border-ink-700" : ""
              } ${i < 2 ? "border-b border-ink-700" : ""}`}
            >
              <span className="font-mono text-2xl font-bold text-blurple-light sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-ink-300 sm:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

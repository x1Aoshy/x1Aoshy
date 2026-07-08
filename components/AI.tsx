"use client";

import Reveal from "./Reveal";
import PulseDot from "./PulseDot";
import { useI18n } from "@/lib/i18n";

const copy = {
  es: {
    tag: "Ingeniería con IA",
    title: "Product Engineer con IA",
    desc: "Estoy adaptado y listo para la nueva forma de construir. Diseño y creo soluciones apoyándome en agentes de IA para agilizar el trabajo y multiplicar la producción en cualquier aspecto.",
    manifestoLead: "Escribir código a mano y entender la lógica sigue importando",
    manifestoBody:
      ", pero en el futuro gran parte de eso lo hará la IA. El valor real está en diseñar y resolver problemas. Seamos creadores, no repetidores:",
    manifestoHighlight: "sé el ingeniero, no el obrero.",
    capsTitle: "Cómo trabajo con IA",
    caps: [
      {
        title: "Diseño de soluciones",
        body: "Pienso el problema y la arquitectura primero; la IA acelera la ejecución, yo decido el qué y el porqué.",
      },
      {
        title: "Agentes & workflows",
        body: "Agentes que leen, escriben y ejecutan: automatizo tareas encadenando herramientas, memoria y funciones.",
      },
      {
        title: "Multi-modelo",
        body: "Elijo el modelo según el caso y el costo — open source local o API en la nube — y combino varios en un pipeline.",
      },
      {
        title: "Criterio & calidad",
        body: "Reviso, depuro y guío lo que genera la IA: entiendo la lógica para mantener el control de la calidad.",
      },
    ],
    modelsTitle: "Modelos y herramientas que uso",
    modelsNote: "Open source y comercial — chinos, americanos y locales.",
    useTitle: "Cómo aumento la producción",
    uses: [
      "Genero y refactorizo código en minutos, no horas.",
      "Automatizo tareas repetitivas con agentes y scripts.",
      "Depuro y documento apoyándome en varios modelos a la vez.",
      "Prototipo ideas rápido para validar antes de construir.",
    ],
  },
  en: {
    tag: "Engineering with AI",
    title: "Product Engineer with AI",
    desc: "I'm adapted and ready for the new way of building. I design and create solutions, leaning on AI agents to speed up work and multiply output in any area.",
    manifestoLead: "Coding by hand and understanding the logic still matters",
    manifestoBody:
      ", but in the future much of it will be handed to AI. The real value is in designing and solving problems. Let's be creators, not repeaters:",
    manifestoHighlight: "be the engineer, not the construction worker.",
    capsTitle: "How I work with AI",
    caps: [
      {
        title: "Solution design",
        body: "I think through the problem and architecture first; AI speeds up execution, I decide the what and the why.",
      },
      {
        title: "Agents & workflows",
        body: "Agents that read, write and run: I automate tasks by chaining tools, memory and functions.",
      },
      {
        title: "Multi-model",
        body: "I pick the model per use case and cost — local open source or cloud API — and combine several in one pipeline.",
      },
      {
        title: "Judgment & quality",
        body: "I review, debug and guide what AI produces: I understand the logic to keep control over quality.",
      },
    ],
    modelsTitle: "Models & tools I use",
    modelsNote: "Open source and commercial — Chinese, American and local.",
    useTitle: "How I boost output",
    uses: [
      "Generate and refactor code in minutes, not hours.",
      "Automate repetitive tasks with agents and scripts.",
      "Debug and document leaning on several models at once.",
      "Prototype ideas fast to validate before building.",
    ],
  },
} as const;

// Modelos LLM con su color de marca aproximado
const models = [
  { name: "GLM (Zhipu)", color: "bg-[#3859FF]" },
  { name: "Llama", color: "bg-[#0866FF]" },
  { name: "Qwen", color: "bg-[#615CED]" },
  { name: "DeepSeek", color: "bg-[#4D6BFE]" },
  { name: "Claude", color: "bg-[#D97757]" },
  { name: "GPT", color: "bg-[#10A37F]" },
  { name: "Mistral", color: "bg-[#FF7000]" },
  { name: "Gemini", color: "bg-[#4285F4]" },
];

export default function AI() {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section id="ia" className="section-container">
      <Reveal>
        <span className="section-tag">{t.tag}</span>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>
      </Reveal>

      {/* Manifiesto */}
      <Reveal delay={0.08}>
        <blockquote className="mt-8 rounded-lg border border-blurple/30 bg-blurple/5 p-5 sm:p-6">
          <p className="text-[15px] leading-relaxed text-ink-200 sm:text-base">
            <span className="font-medium text-white">{t.manifestoLead}</span>
            {t.manifestoBody}{" "}
            <span className="font-semibold text-blurple-light">
              {t.manifestoHighlight}
            </span>
          </p>
        </blockquote>
      </Reveal>

      <div className="mt-8 grid gap-6 md:mt-10 lg:grid-cols-[1.3fr_1fr] lg:gap-8">
        {/* Capacidades */}
        <div>
          <Reveal>
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-400">
              {t.capsTitle}
            </h3>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.caps.map((cap, i) => (
              <Reveal key={cap.title} delay={0.06 + i * 0.06}>
                <div className="card h-full p-5">
                  <div className="mb-2 flex items-center gap-2.5">
                    <PulseDot color="bg-blurple" delay={i * 0.3} />
                    <h4 className="text-sm font-semibold text-white">
                      {cap.title}
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-300">
                    {cap.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Modelos + cómo aumento la producción */}
        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="card p-5">
              <h3 className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-400">
                {t.modelsTitle}
              </h3>
              <p className="mb-4 text-xs text-ink-500">{t.modelsNote}</p>
              <div className="flex flex-wrap gap-2">
                {models.map((model) => (
                  <span
                    key={model.name}
                    className="inline-flex items-center gap-2 rounded-md border border-ink-700 bg-ink-950 px-2.5 py-1.5 font-mono text-xs text-ink-200"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${model.color}`}
                      aria-hidden
                    />
                    {model.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="card p-5">
              <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-400">
                {t.useTitle}
              </h3>
              <ul className="space-y-2.5">
                {t.uses.map((use) => (
                  <li
                    key={use}
                    className="flex items-start gap-2.5 text-sm text-ink-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blurple-light" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

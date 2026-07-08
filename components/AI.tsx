"use client";

import Reveal from "./Reveal";
import PulseDot from "./PulseDot";
import { useI18n } from "@/lib/i18n";

const copy = {
  es: {
    tag: "IA & Automatización",
    title: "Prompt Specialist & agentes LLM",
    desc: "Diseño prompts y flujos con agentes de IA para agilizar el trabajo y multiplicar la producción — desde escribir y depurar código hasta automatizar tareas repetitivas en cualquier área.",
    capsTitle: "Lo que hago con IA",
    caps: [
      {
        title: "Prompt Engineering",
        body: "Prompts precisos y reutilizables: few-shot, chain-of-thought, roles y plantillas que sacan resultados consistentes del modelo.",
      },
      {
        title: "Agentes & workflows",
        body: "Agentes que leen, escriben y ejecutan: automatizo tareas encadenando herramientas, memoria y llamadas a funciones.",
      },
      {
        title: "Multi-modelo",
        body: "Elijo el modelo según el caso y el costo — open source local o API en la nube — y combino varios en un mismo pipeline.",
      },
      {
        title: "Productividad real",
        body: "Uso la IA para escribir código, documentar, refactorizar y depurar más rápido, sin perder el control de la calidad.",
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
    tag: "AI & Automation",
    title: "Prompt Specialist & LLM agents",
    desc: "I design prompts and agent workflows to speed up work and multiply output — from writing and debugging code to automating repetitive tasks in any area.",
    capsTitle: "What I do with AI",
    caps: [
      {
        title: "Prompt Engineering",
        body: "Precise, reusable prompts: few-shot, chain-of-thought, roles and templates that get consistent results from the model.",
      },
      {
        title: "Agents & workflows",
        body: "Agents that read, write and run: I automate tasks by chaining tools, memory and function calls.",
      },
      {
        title: "Multi-model",
        body: "I pick the model per use case and cost — local open source or cloud API — and combine several in one pipeline.",
      },
      {
        title: "Real productivity",
        body: "I use AI to write code, document, refactor and debug faster, without losing control over quality.",
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

      <div className="mt-8 grid gap-6 md:mt-12 lg:grid-cols-[1.3fr_1fr] lg:gap-8">
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

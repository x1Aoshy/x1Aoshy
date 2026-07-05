import Reveal from "./Reveal";

const items = [
  {
    period: "2025 — Presente",
    title: "Full Stack Junior Developer",
    place: "Proyectos freelance & personales",
    description:
      "Desarrollo de aplicaciones web completas con Java, C#, JavaScript y PHP. Despliegues en AWS (EC2) y Google Cloud (Compute Engine), y contenedores con Docker y Kubernetes.",
    tags: ["Java", "JavaScript", "AWS", "GCP"],
  },
  {
    period: "2024 — 2025",
    title: "Desarrollador en formación",
    place: "Proyectos de práctica intensiva",
    description:
      "Un año de experiencia práctica construyendo proyectos reales: APIs REST, aplicaciones de gestión y sitios web. Base sólida en bases de datos SQL y control de versiones con Git.",
    tags: ["C#", "PHP", "SQL", "Git"],
  },
  {
    period: "2024",
    title: "Diseño UI/UX",
    place: "Figma",
    description:
      "Diseño de interfaces y prototipos en Figma: wireframes, sistemas de diseño y flujos de usuario centrados en experiencias simples y agradables.",
    tags: ["Figma", "UI/UX", "Prototipado"],
  },
];

export default function Experience() {
  return (
    <section id="experiencia" className="section-container">
      <Reveal>
        <span className="section-tag">Experiencia</span>
        <h2 className="section-title">Mi recorrido</h2>
      </Reveal>

      <div className="relative mt-12 ml-3 border-l border-ink-700 pl-8 md:ml-6">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={0.1 + i * 0.12}>
            <div className="relative pb-12 last:pb-0">
              {/* Punto del timeline */}
              <span className="absolute -left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-blurple bg-ink-950">
                <span className="h-1.5 w-1.5 rounded-full bg-blurple-light" />
              </span>

              <span className="font-mono text-sm text-blurple-light">
                {item.period}
              </span>
              <h3 className="mt-1 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="font-mono text-sm text-ink-400">{item.place}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-300">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-ink-700 bg-ink-900 px-2.5 py-1 font-mono text-xs text-ink-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

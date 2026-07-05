import Reveal from "./Reveal";
import type { ExperienceItem } from "@/lib/data";

export default function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experiencia" className="section-container">
      <Reveal>
        <span className="section-tag">Experiencia</span>
        <h2 className="section-title">Mi recorrido</h2>
      </Reveal>

      <div className="relative mt-12 ml-2 border-l border-ink-700 pl-7 sm:ml-3 sm:pl-8 md:ml-6">
        {items.map((item, i) => (
          <Reveal key={item.id ?? item.title} delay={0.1 + i * 0.12}>
            <div className="relative pb-12 last:pb-0">
              {/* Punto del timeline */}
              <span className="absolute -left-[36px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-blurple bg-ink-950 sm:-left-[39px]">
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

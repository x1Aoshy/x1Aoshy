"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import type { ExperienceItem } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const copy = {
  es: { tag: "Experiencia", title: "Mi recorrido" },
  en: { tag: "Experience", title: "My journey" },
} as const;

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { lang } = useI18n();
  const t = copy[lang];

  // La línea azul se dibuja a medida que el timeline entra en pantalla
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experiencia" className="section-container">
      <Reveal>
        <span className="section-tag">{t.tag}</span>
        <h2 className="section-title">{t.title}</h2>
      </Reveal>

      <div ref={timelineRef} className="relative mt-8 md:mt-12">
        {/* Línea base */}
        <div
          className="absolute left-2 top-0 h-full w-px bg-ink-700 sm:left-3 md:left-6"
          aria-hidden
        />
        {/* Línea de progreso animada */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-2 top-0 h-full w-px origin-top bg-blurple sm:left-3 md:left-6"
          aria-hidden
        />

        <div className="space-y-6 pl-10 sm:space-y-8 sm:pl-12 md:pl-16">
          {items.map((item, i) => (
            <motion.article
              key={item.id ?? item.title}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group relative rounded-lg border border-ink-700 bg-ink-900 p-5 transition-colors duration-300 hover:border-blurple/60 sm:p-6"
            >
              {/* Punto sobre la línea, con halo palpitante */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 18,
                  delay: 0.18 + i * 0.08,
                }}
                className="absolute -left-[40px] top-7 flex h-4 w-4 items-center justify-center rounded-full border border-blurple bg-ink-950 sm:-left-[44px] md:-left-[48px]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inset-0 animate-pulse-ring rounded-full bg-blurple-light motion-reduce:animate-none"
                    style={{ animationDelay: `${i * 0.45}s` }}
                    aria-hidden
                  />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-blurple-light transition-colors duration-300 group-hover:bg-white" />
                </span>
              </motion.span>

              {/* Conector horizontal punto → tarjeta */}
              <span
                className="absolute -left-6 top-9 h-px w-6 bg-ink-700 transition-colors duration-300 group-hover:bg-blurple/60 sm:-left-7 sm:w-7 md:-left-10 md:w-10"
                aria-hidden
              />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-block rounded border border-blurple/40 bg-blurple/5 px-2 py-0.5 font-mono text-xs text-blurple-light">
                  {item.period}
                </span>
                <span className="font-mono text-xs text-ink-400">
                  {item.place}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blurple-light sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-300 sm:text-base">
                {item.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag, ti) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.08 + ti * 0.05 }}
                    className="rounded border border-ink-700 bg-ink-950 px-2.5 py-1 font-mono text-xs text-ink-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

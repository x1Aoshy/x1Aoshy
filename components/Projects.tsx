"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import type { Project } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const copy = {
  es: {
    tag: "Proyectos",
    title: "Cosas que he construido",
    desc: "Una selección de proyectos donde aplico mi stack: del diseño en Figma al despliegue en la nube.",
    demo: "Ver demo →",
    code: "Código",
  },
  en: {
    tag: "Projects",
    title: "Things I've built",
    desc: "A selection of projects where I apply my stack: from Figma designs to cloud deployments.",
    demo: "View demo →",
    code: "Code",
  },
} as const;

// Estilos de preview que rotan según el índice del proyecto
const previewVariants = [
  {
    lines: [
      { width: "60%", color: "bg-blurple/70" },
      { width: "85%", color: "bg-ink-600" },
      { width: "45%", color: "bg-grape/70" },
    ],
    blocks: 4,
  },
  {
    lines: [
      { width: "75%", color: "bg-green-500/60" },
      { width: "55%", color: "bg-ink-600" },
      { width: "90%", color: "bg-blurple/70" },
    ],
    blocks: 3,
  },
  {
    lines: [
      { width: "50%", color: "bg-grape/70" },
      { width: "80%", color: "bg-ink-600" },
      { width: "65%", color: "bg-blurple/70" },
    ],
    blocks: 6,
  },
];

function previewBar(project: Project): string {
  try {
    if (project.url) return new URL(project.url).host;
  } catch {
    // url inválida: usar fallback
  }
  return project.title.toLowerCase().replace(/\s+/g, "-") + ".dev";
}

function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(url);
}

function BrowserPreview({
  project,
  index,
  hovered,
}: {
  project: Project;
  index: number;
  hovered: boolean;
}) {
  const variant = previewVariants[index % previewVariants.length];
  const media = project.media_url?.trim();
  const videoRef = useRef<HTMLVideoElement>(null);

  // En pantallas táctiles no hay hover: el media se muestra siempre
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const active = hovered || coarse;

  // El video se reproduce cuando la tarjeta está activa (hover en
  // escritorio, siempre en móvil) y arranca desde el principio
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      if (!coarse) video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, coarse]);

  return (
    <div className="border-b border-ink-700 bg-ink-950 p-5 pb-0">
      {/* Ventana de navegador simulada */}
      <div className="overflow-hidden rounded-t-md border border-b-0 border-ink-700 bg-ink-900">
        <div className="flex items-center gap-2 border-b border-ink-700 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full border border-ink-600" />
          <span className="h-2 w-2 rounded-full border border-ink-600" />
          <span className="h-2 w-2 rounded-full border border-ink-600" />
          <span className="ml-3 flex-1 truncate rounded border border-ink-700 bg-ink-950 px-3 py-1 font-mono text-[10px] text-ink-400">
            {previewBar(project)}
          </span>
        </div>

        <div className="relative">
          {/* Esqueleto: se desvanece cuando hay media y la tarjeta
              está activa (hover en escritorio, siempre en táctil) */}
          <div
            className={`space-y-2.5 p-4 transition-opacity duration-500 ${
              media && active ? "opacity-0" : "opacity-100"
            }`}
          >
            {variant.lines.map((line, i) => (
              <div
                key={i}
                className={`h-2 rounded-full ${line.color}`}
                style={{ width: line.width }}
              />
            ))}
            <div
              className="grid gap-2 pt-1"
              style={{
                gridTemplateColumns: `repeat(${Math.min(variant.blocks, 3)}, 1fr)`,
              }}
            >
              {Array.from({ length: variant.blocks }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded border border-ink-700 bg-ink-850"
                />
              ))}
            </div>
          </div>

          {/* Media real del proyecto: crossfade + zoom sutil al activar */}
          {media && (
            <div
              className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              {isVideoUrl(media) ? (
                <video
                  ref={videoRef}
                  src={media}
                  className={`h-full w-full object-cover transition-transform duration-700 ${
                    active ? "scale-100" : "scale-[1.04]"
                  }`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media}
                  alt={project.title}
                  className={`h-full w-full object-cover transition-transform duration-700 ${
                    active ? "scale-100" : "scale-[1.04]"
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  t,
}: {
  project: Project;
  index: number;
  t: (typeof copy)[keyof typeof copy];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-700 bg-ink-900 transition-colors duration-200 hover:border-ink-500"
    >
      <BrowserPreview project={project} index={index} hovered={hovered} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-blurple-light">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-300">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-ink-700 bg-ink-950 px-2 py-0.5 font-mono text-xs text-ink-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-4 border-t border-ink-700 pt-4 text-sm font-medium">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blurple-light transition-colors hover:text-white"
            >
              {t.demo}
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-300 transition-colors hover:text-white"
            >
              {t.code}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <section id="proyectos" className="section-container">
      <Reveal>
        <span className="section-tag">{t.tag}</span>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal
            key={project.id ?? project.title}
            delay={0.08 + i * 0.08}
            className="h-full"
          >
            <ProjectCard project={project} index={i} t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

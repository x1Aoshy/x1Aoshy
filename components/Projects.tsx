"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

type Project = {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  url: string;
  repo: string;
  preview: {
    bar: string;
    lines: { width: string; color: string }[];
    blocks: number;
  };
};

const projects: Project[] = [
  {
    title: "Dashboard Cloud",
    description:
      "Panel de control para monitorear instancias EC2 y VMs de Compute Engine en tiempo real, con métricas y alertas.",
    tags: ["Next.js", "TypeScript", "AWS", "Tailwind"],
    gradient: "from-blurple via-blurple-dark to-grape-deeper",
    url: "https://aoshy.dev",
    repo: "https://github.com/x1Aoshy",
    preview: {
      bar: "cloud.aoshy.dev",
      lines: [
        { width: "60%", color: "bg-blurple/70" },
        { width: "85%", color: "bg-ink-500" },
        { width: "45%", color: "bg-grape/70" },
      ],
      blocks: 4,
    },
  },
  {
    title: "API REST E-commerce",
    description:
      "Backend en Java con autenticación, catálogo de productos y pasarela de pagos, desplegado en Kubernetes.",
    tags: ["Java", "Spring", "Kubernetes", "Docker"],
    gradient: "from-grape via-grape-dark to-ink-900",
    url: "https://aoshy.dev",
    repo: "https://github.com/x1Aoshy",
    preview: {
      bar: "api.aoshy.dev/docs",
      lines: [
        { width: "75%", color: "bg-green-500/60" },
        { width: "55%", color: "bg-ink-500" },
        { width: "90%", color: "bg-blurple/70" },
      ],
      blocks: 3,
    },
  },
  {
    title: "App de Gestión",
    description:
      "Aplicación web en C# / .NET para gestión de inventario con reportes, roles de usuario y base de datos SQL.",
    tags: ["C#", ".NET", "SQL", "Figma"],
    gradient: "from-blurple-light via-blurple to-grape",
    url: "https://aoshy.dev",
    repo: "https://github.com/x1Aoshy",
    preview: {
      bar: "gestion.aoshy.dev",
      lines: [
        { width: "50%", color: "bg-grape/70" },
        { width: "80%", color: "bg-ink-500" },
        { width: "65%", color: "bg-blurple/70" },
      ],
      blocks: 6,
    },
  },
];

function BrowserPreview({ project }: { project: Project }) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl">
      {/* Fondo con gradiente */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30 transition-opacity duration-500 group-hover:opacity-50`}
      />
      <div className="relative p-5 pb-0">
        {/* Ventana de navegador simulada */}
        <div className="overflow-hidden rounded-t-xl border border-b-0 border-ink-600/60 bg-ink-900/90 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02]">
          <div className="flex items-center gap-2 border-b border-ink-600/50 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-3 flex-1 rounded-md bg-ink-800 px-3 py-1 font-mono text-[10px] text-ink-400">
              {project.preview.bar}
            </span>
          </div>
          <div className="space-y-2.5 p-4">
            {project.preview.lines.map((line, i) => (
              <div
                key={i}
                className={`h-2.5 rounded-full ${line.color}`}
                style={{ width: line.width }}
              />
            ))}
            <div
              className="grid gap-2 pt-1"
              style={{
                gridTemplateColumns: `repeat(${Math.min(project.preview.blocks, 3)}, 1fr)`,
              }}
            >
              {Array.from({ length: project.preview.blocks }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded-lg border border-ink-600/40 bg-ink-800/80"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="proyectos" className="section-container">
      <Reveal>
        <span className="section-tag">Proyectos</span>
        <h2 className="section-title">Cosas que he construido</h2>
        <p className="max-w-2xl text-ink-300">
          Una selección de proyectos donde aplico mi stack: del diseño en Figma
          al despliegue en la nube.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={0.1 + i * 0.12} className="h-full">
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-600/50 bg-ink-800/80 transition-colors duration-300 hover:border-blurple/60 hover:shadow-glow"
            >
              <BrowserPreview project={project} />

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-blurple-light">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-300">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-grape/30 bg-grape/10 px-2.5 py-1 font-mono text-xs text-ink-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-3 border-t border-ink-600/40 pt-4 text-sm font-semibold">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blurple-light transition-colors hover:text-white"
                  >
                    Ver demo →
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-300 transition-colors hover:text-white"
                  >
                    Código
                  </a>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

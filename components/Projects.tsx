import Reveal from "./Reveal";

type Project = {
  title: string;
  description: string;
  tags: string[];
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
    url: "https://aoshy.dev",
    repo: "https://github.com/x1Aoshy",
    preview: {
      bar: "cloud.aoshy.dev",
      lines: [
        { width: "60%", color: "bg-blurple/70" },
        { width: "85%", color: "bg-ink-600" },
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
    url: "https://aoshy.dev",
    repo: "https://github.com/x1Aoshy",
    preview: {
      bar: "api.aoshy.dev/docs",
      lines: [
        { width: "75%", color: "bg-green-500/60" },
        { width: "55%", color: "bg-ink-600" },
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
    url: "https://aoshy.dev",
    repo: "https://github.com/x1Aoshy",
    preview: {
      bar: "gestion.aoshy.dev",
      lines: [
        { width: "50%", color: "bg-grape/70" },
        { width: "80%", color: "bg-ink-600" },
        { width: "65%", color: "bg-blurple/70" },
      ],
      blocks: 6,
    },
  },
];

function BrowserPreview({ project }: { project: Project }) {
  return (
    <div className="border-b border-ink-700 bg-ink-950 p-5 pb-0">
      {/* Ventana de navegador simulada */}
      <div className="overflow-hidden rounded-t-md border border-b-0 border-ink-700 bg-ink-900">
        <div className="flex items-center gap-2 border-b border-ink-700 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full border border-ink-500" />
          <span className="h-2 w-2 rounded-full border border-ink-500" />
          <span className="h-2 w-2 rounded-full border border-ink-500" />
          <span className="ml-3 flex-1 rounded border border-ink-700 bg-ink-950 px-3 py-1 font-mono text-[10px] text-ink-400">
            {project.preview.bar}
          </span>
        </div>
        <div className="space-y-2.5 p-4">
          {project.preview.lines.map((line, i) => (
            <div
              key={i}
              className={`h-2 rounded-full ${line.color}`}
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
                className="h-10 rounded border border-ink-700 bg-ink-850"
              />
            ))}
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

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={0.08 + i * 0.08} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-700 bg-ink-900 transition-colors duration-200 hover:border-ink-500">
              <BrowserPreview project={project} />

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
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

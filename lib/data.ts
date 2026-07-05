// Tipos compartidos y contenido por defecto.
// Si Supabase está configurado, estos datos se sobreescriben desde el panel /admin.

export type Profile = {
  name: string;
  roles: string[];
  bio: string;
  email: string;
  github: string;
  available: boolean;
};

export type Project = {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  repo: string;
  sort_order?: number;
};

export type ExperienceItem = {
  id?: string;
  period: string;
  title: string;
  place: string;
  description: string;
  tags: string[];
  sort_order?: number;
};

export const defaultProfile: Profile = {
  name: "Hian Chang",
  roles: [
    "Full Stack Developer",
    "Cloud Enthusiast",
    "UI/UX con Figma",
    "Aoshy Dev",
  ],
  bio: "Desarrollador Full Stack Junior con experiencia en Java, C#, JavaScript y PHP. Trabajo con AWS y Google Cloud, y me apasiona crear soluciones eficientes y fáciles de usar.",
  email: "hianchang123@gmail.com",
  github: "https://github.com/x1Aoshy",
  available: true,
};

export const defaultProjects: Project[] = [
  {
    title: "Dashboard Cloud",
    description:
      "Panel de control para monitorear instancias EC2 y VMs de Compute Engine en tiempo real, con métricas y alertas.",
    tags: ["Next.js", "TypeScript", "AWS", "Tailwind"],
    url: "https://aoshy.dev",
    repo: "https://github.com/x1Aoshy",
  },
  {
    title: "API REST E-commerce",
    description:
      "Backend en Java con autenticación, catálogo de productos y pasarela de pagos, desplegado en Kubernetes.",
    tags: ["Java", "Spring", "Kubernetes", "Docker"],
    url: "https://aoshy.dev",
    repo: "https://github.com/x1Aoshy",
  },
  {
    title: "App de Gestión",
    description:
      "Aplicación web en C# / .NET para gestión de inventario con reportes, roles de usuario y base de datos SQL.",
    tags: ["C#", ".NET", "SQL", "Figma"],
    url: "https://aoshy.dev",
    repo: "https://github.com/x1Aoshy",
  },
];

export const defaultExperience: ExperienceItem[] = [
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

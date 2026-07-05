import Reveal from "./Reveal";

type Skill = { name: string; icon: string; level: number };

const groups: { title: string; accent: string; skills: Skill[] }[] = [
  {
    title: "Lenguajes",
    accent: "from-blurple to-blurple-dark",
    skills: [
      { name: "Java", icon: "☕", level: 85 },
      { name: "C#", icon: "🎯", level: 80 },
      { name: "JavaScript / TypeScript", icon: "⚡", level: 85 },
      { name: "PHP", icon: "🐘", level: 75 },
    ],
  },
  {
    title: "Frameworks & Librerías",
    accent: "from-grape to-grape-dark",
    skills: [
      { name: "React / Next.js", icon: "⚛️", level: 80 },
      { name: "Tailwind CSS", icon: "🎨", level: 85 },
      { name: "Node.js", icon: "🟢", level: 75 },
      { name: ".NET", icon: "🔷", level: 70 },
    ],
  },
  {
    title: "Herramientas & Diseño",
    accent: "from-blurple-light to-grape",
    skills: [
      { name: "Figma (UI/UX)", icon: "🖌️", level: 85 },
      { name: "Git & GitHub", icon: "🌿", level: 85 },
      { name: "Supabase / SQL", icon: "🗄️", level: 70 },
      { name: "Docker", icon: "🐳", level: 70 },
    ],
  },
];

const marqueeItems = [
  "Java",
  "C#",
  "JavaScript",
  "TypeScript",
  "PHP",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  ".NET",
  "Supabase",
  "Docker",
  "Kubernetes",
  "AWS EC2",
  "Google Cloud",
  "Figma",
];

export default function Stack() {
  return (
    <section id="stack" className="section-container">
      <Reveal>
        <span className="section-tag">Stack</span>
        <h2 className="section-title">Frameworks y tecnologías que manejo</h2>
        <p className="max-w-2xl text-ink-300">
          Del backend al frontend, pasando por el diseño: estas son las
          herramientas con las que construyo.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {groups.map((group, gi) => (
          <Reveal key={group.title} delay={0.1 + gi * 0.12}>
            <div className="card h-full p-6">
              <h3
                className={`mb-6 inline-block bg-gradient-to-r ${group.accent} bg-clip-text text-lg font-bold text-transparent`}
              >
                {group.title}
              </h3>
              <ul className="space-y-5">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-ink-100">
                        <span aria-hidden>{skill.icon}</span> {skill.name}
                      </span>
                      <span className="font-mono text-xs text-ink-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-ink-900">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${group.accent} transition-all duration-700`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Marquee infinito */}
      <Reveal delay={0.2}>
        <div className="relative mt-14 overflow-hidden rounded-2xl border border-ink-600/50 bg-ink-800/60 py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
          <div className="flex w-max animate-marquee gap-3">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="whitespace-nowrap rounded-full border border-ink-600/60 bg-ink-900/80 px-4 py-1.5 font-mono text-sm text-ink-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

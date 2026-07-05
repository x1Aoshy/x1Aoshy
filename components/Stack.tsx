import Reveal from "./Reveal";

type Skill = { name: string; level: number };

const groups: {
  index: string;
  title: string;
  bar: string;
  skills: Skill[];
}[] = [
  {
    index: "01",
    title: "Lenguajes",
    bar: "bg-blurple",
    skills: [
      { name: "Java", level: 85 },
      { name: "C#", level: 80 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "PHP", level: 75 },
    ],
  },
  {
    index: "02",
    title: "Frameworks & Librerías",
    bar: "bg-grape",
    skills: [
      { name: "React / Next.js", level: 80 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Node.js", level: 75 },
      { name: ".NET", level: 70 },
    ],
  },
  {
    index: "03",
    title: "Herramientas & Diseño",
    bar: "bg-blurple-light",
    skills: [
      { name: "Figma (UI/UX)", level: 85 },
      { name: "Git & GitHub", level: 85 },
      { name: "Supabase / SQL", level: 70 },
      { name: "Docker", level: 70 },
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

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink-700 bg-ink-700 md:grid-cols-3">
        {groups.map((group, gi) => (
          <Reveal key={group.title} delay={0.08 + gi * 0.08} className="h-full">
            <div className="h-full bg-ink-900 p-6">
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-semibold text-white">{group.title}</h3>
                <span className="font-mono text-xs text-ink-400">
                  {group.index}
                </span>
              </div>
              <ul className="space-y-5">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium text-ink-100">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-ink-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-ink-700">
                      <div
                        className={`h-full rounded-full ${group.bar}`}
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
      <Reveal delay={0.16}>
        <div className="relative mt-10 overflow-hidden rounded-lg border border-ink-700 py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
          <div className="flex w-max animate-marquee gap-3">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="whitespace-nowrap rounded-md border border-ink-700 bg-ink-900 px-4 py-1.5 font-mono text-sm text-ink-200"
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

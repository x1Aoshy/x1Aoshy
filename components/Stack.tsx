"use client";

import Reveal from "./Reveal";
import { useI18n } from "@/lib/i18n";

type Skill = { name: string; level: number };

type Group = {
  index: string;
  title: string;
  bar: string;
  skills: Skill[];
};

const skills: Record<"langs" | "frameworks" | "tools", Skill[]> = {
  langs: [
    { name: "Java", level: 85 },
    { name: "C#", level: 80 },
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "PHP", level: 75 },
  ],
  frameworks: [
    { name: "React / Next.js", level: 80 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Node.js", level: 75 },
    { name: ".NET", level: 70 },
  ],
  tools: [
    { name: "Figma (UI/UX)", level: 85 },
    { name: "Git & GitHub", level: 85 },
    { name: "Supabase / SQL", level: 70 },
    { name: "Docker", level: 70 },
  ],
};

const copy = {
  es: {
    tag: "Stack",
    title: "Frameworks y tecnologías que manejo",
    desc: "Del backend al frontend, pasando por el diseño: estas son las herramientas con las que construyo.",
    groups: ["Lenguajes", "Frameworks & Librerías", "Herramientas & Diseño"],
  },
  en: {
    tag: "Stack",
    title: "Frameworks and technologies I work with",
    desc: "From backend to frontend, through design: these are the tools I build with.",
    groups: ["Languages", "Frameworks & Libraries", "Tools & Design"],
  },
} as const;

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
  const { lang } = useI18n();
  const t = copy[lang];

  const groups: Group[] = [
    { index: "01", title: t.groups[0], bar: "bg-blurple", skills: skills.langs },
    { index: "02", title: t.groups[1], bar: "bg-grape", skills: skills.frameworks },
    { index: "03", title: t.groups[2], bar: "bg-blurple-light", skills: skills.tools },
  ];

  return (
    <section id="stack" className="section-container">
      <Reveal>
        <span className="section-tag">{t.tag}</span>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>
      </Reveal>

      <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-ink-700 bg-ink-700 md:mt-12 md:grid-cols-3">
        {groups.map((group, gi) => (
          <Reveal key={group.index} delay={0.08 + gi * 0.08} className="h-full">
            <div className="h-full bg-ink-900 p-5 sm:p-6">
              <div className="mb-5 flex items-baseline justify-between sm:mb-6">
                <h3 className="font-semibold text-white">{group.title}</h3>
                <span className="font-mono text-xs text-ink-400">
                  {group.index}
                </span>
              </div>
              <ul className="space-y-4 sm:space-y-5">
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
        <div className="relative mt-8 overflow-hidden rounded-lg border border-ink-700 py-4 md:mt-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-950 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-950 to-transparent sm:w-24" />
          <div className="flex w-max animate-marquee gap-3 motion-reduce:animate-none">
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

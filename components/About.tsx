import Reveal from "./Reveal";

const stats = [
  { value: "1+", label: "Año de experiencia" },
  { value: "4", label: "Lenguajes principales" },
  { value: "2", label: "Nubes (AWS & GCP)" },
  { value: "∞", label: "Ganas de aprender" },
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-container">
      <Reveal>
        <span className="section-tag">Sobre mí</span>
        <h2 className="section-title">
          Código limpio, nube y buen diseño
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal delay={0.1}>
          <div className="space-y-4 text-lg leading-relaxed text-ink-200">
            <p>
              Soy <strong className="text-white">Hian Chang</strong> (también
              conocido como <span className="text-blurple-light">Aoshy Dev</span>),
              un desarrollador <strong className="text-white">Full Stack Junior</strong>{" "}
              con experiencia práctica en{" "}
              <strong className="text-white">Java, C#, JavaScript y PHP</strong>.
            </p>
            <p>
              He trabajado con servicios de{" "}
              <strong className="text-white">AWS</strong> y{" "}
              <strong className="text-white">Google Cloud</strong> — incluyendo
              Compute Engine y EC2 — además de contenedores y orquestación con{" "}
              <strong className="text-white">Kubernetes</strong>.
            </p>
            <p>
              También tengo habilidades de diseño{" "}
              <strong className="text-white">UI/UX con Figma</strong>, lo que me
              permite cuidar tanto la lógica como la experiencia del usuario.
              Me apasiona crear soluciones eficientes y fáciles de usar.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-ink-700">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center gap-1 bg-ink-900 p-6 text-center transition-colors hover:bg-ink-850 ${
                i % 2 === 0 ? "border-r border-ink-700" : ""
              } ${i < 2 ? "border-b border-ink-700" : ""}`}
            >
              <span className="font-mono text-3xl font-bold text-blurple-light">
                {stat.value}
              </span>
              <span className="text-sm text-ink-300">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

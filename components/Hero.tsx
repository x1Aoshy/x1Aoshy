"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ROLES = [
  "Full Stack Developer",
  "Cloud Enthusiast",
  "UI/UX con Figma",
  "Aoshy Dev",
];

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDeleting(true), 1600);
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % ROLES.length);
          }
        }
      },
      deleting ? 40 : 80,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <span className="font-mono text-blurple-light">
      {text}
      <span className="animate-blink">▌</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="hero-grid absolute inset-0" aria-hidden />

      <div className="section-container relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-md border border-ink-700 bg-ink-900 px-3 py-1.5 font-mono text-xs text-ink-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Disponible para nuevos proyectos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl"
          >
            Hola, soy{" "}
            <span className="text-blurple-light">Hian Chang</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 text-xl text-ink-200 md:text-2xl"
          >
            <Typewriter />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-xl leading-relaxed text-ink-300"
          >
            Desarrollador Full Stack Junior con experiencia en Java, C#,
            JavaScript y PHP. Trabajo con AWS y Google Cloud, y me apasiona
            crear soluciones eficientes y fáciles de usar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#proyectos" className="btn-primary">
              Ver proyectos
            </a>
            <a href="#contacto" className="btn-secondary">
              Hablemos
            </a>
          </motion.div>
        </div>

        {/* Tarjeta estilo terminal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="overflow-hidden rounded-lg border border-ink-700 bg-ink-900 font-mono text-sm">
            <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-950 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full border border-ink-500" />
              <span className="h-2.5 w-2.5 rounded-full border border-ink-500" />
              <span className="h-2.5 w-2.5 rounded-full border border-ink-500" />
              <span className="ml-2 text-xs text-ink-400">hian@aoshy-dev: ~</span>
            </div>
            <div className="space-y-2 p-5 text-ink-200">
              <p>
                <span className="text-grape">$</span> whoami
              </p>
              <p className="text-white">hian-chang · aoshy-dev</p>
              <p>
                <span className="text-grape">$</span> cat stack.json
              </p>
              <p className="text-ink-300">
                {"{"} <span className="text-blurple-light">&quot;langs&quot;</span>: [
                <span className="text-green-400">&quot;Java&quot;</span>,{" "}
                <span className="text-green-400">&quot;C#&quot;</span>,{" "}
                <span className="text-green-400">&quot;JS/TS&quot;</span>,{" "}
                <span className="text-green-400">&quot;PHP&quot;</span>],
              </p>
              <p className="pl-4 text-ink-300">
                <span className="text-blurple-light">&quot;cloud&quot;</span>: [
                <span className="text-green-400">&quot;AWS&quot;</span>,{" "}
                <span className="text-green-400">&quot;GCP&quot;</span>,{" "}
                <span className="text-green-400">&quot;K8s&quot;</span>] {"}"}
              </p>
              <p>
                <span className="text-grape">$</span> uptime --coding
              </p>
              <p className="text-white">1+ año construyendo proyectos reales</p>
              <p>
                <span className="text-grape">$</span>{" "}
                <span className="animate-blink">▌</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

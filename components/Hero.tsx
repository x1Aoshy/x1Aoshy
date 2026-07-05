"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Profile } from "@/lib/data";

function Typewriter({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex % roles.length];
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
            setRoleIndex((i) => (i + 1) % roles.length);
          }
        }
      },
      deleting ? 40 : 80,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className="font-mono text-blurple-light">
      {text}
      <span className="animate-blink">▌</span>
    </span>
  );
}

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="inicio"
      className="flex items-center pt-14 md:min-h-screen"
    >
      <div className="section-container grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div>
          {profile.available && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mb-6 flex items-center gap-2 text-sm text-ink-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Disponible para nuevos proyectos
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Hola, soy{" "}
            <span className="text-blurple-light">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-4 text-lg text-ink-200 sm:text-xl"
          >
            <Typewriter roles={profile.roles} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-xl leading-relaxed text-ink-300"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="overflow-hidden rounded-lg border border-ink-700 bg-ink-900 font-mono text-[13px] sm:text-sm">
            <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-950 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full border border-ink-600" />
              <span className="h-2.5 w-2.5 rounded-full border border-ink-600" />
              <span className="h-2.5 w-2.5 rounded-full border border-ink-600" />
              <span className="ml-2 text-xs text-ink-400">hian@aoshy-dev: ~</span>
            </div>
            <div className="space-y-2 p-4 text-ink-200 sm:p-5">
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

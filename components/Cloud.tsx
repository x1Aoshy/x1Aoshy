"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

type CloudTab = {
  id: string;
  label: string;
  icon: string;
  file: string;
  description: string;
  code: { text: string; className?: string }[][];
};

// Helpers de color para los snippets
const kw = "text-grape";        // palabras clave
const key = "text-blurple-light"; // claves yaml/flags
const str = "text-green-400";   // strings
const cmt = "text-ink-400";     // comentarios
const cmd = "text-yellow-300";  // comandos

const tabs: CloudTab[] = [
  {
    id: "k8s",
    label: "Kubernetes",
    icon: "☸️",
    file: "deployment.yaml",
    description:
      "Orquestación de contenedores: deployments, servicios y escalado automático de aplicaciones.",
    code: [
      [{ text: "apiVersion", className: key }, { text: ": apps/v1" }],
      [{ text: "kind", className: key }, { text: ": " }, { text: "Deployment", className: kw }],
      [{ text: "metadata", className: key }, { text: ":" }],
      [{ text: "  name", className: key }, { text: ": " }, { text: "aoshy-app", className: str }],
      [{ text: "spec", className: key }, { text: ":" }],
      [{ text: "  replicas", className: key }, { text: ": 3" }],
      [{ text: "  selector", className: key }, { text: ":" }],
      [{ text: "    matchLabels", className: key }, { text: ":" }],
      [{ text: "      app", className: key }, { text: ": " }, { text: "aoshy-app", className: str }],
      [{ text: "  template", className: key }, { text: ":" }],
      [{ text: "    spec", className: key }, { text: ":" }],
      [{ text: "      containers", className: key }, { text: ":" }],
      [{ text: "        - name", className: key }, { text: ": " }, { text: "web", className: str }],
      [{ text: "          image", className: key }, { text: ": " }, { text: "aoshy/portfolio:1.0", className: str }],
      [{ text: "          ports", className: key }, { text: ":" }],
      [{ text: "            - containerPort", className: key }, { text: ": 3000" }],
    ],
  },
  {
    id: "aws",
    label: "AWS EC2",
    icon: "🟠",
    file: "launch-ec2.sh",
    description:
      "Instancias EC2 en AWS: creación, configuración de seguridad y despliegue de aplicaciones.",
    code: [
      [{ text: "# Lanzar una instancia EC2", className: cmt }],
      [{ text: "aws ec2 run-instances", className: cmd }, { text: " \\" }],
      [{ text: "  --image-id", className: key }, { text: " " }, { text: "ami-0abcdef1234567890", className: str }, { text: " \\" }],
      [{ text: "  --instance-type", className: key }, { text: " " }, { text: "t3.micro", className: str }, { text: " \\" }],
      [{ text: "  --key-name", className: key }, { text: " " }, { text: "aoshy-key", className: str }, { text: " \\" }],
      [{ text: "  --security-group-ids", className: key }, { text: " " }, { text: "sg-web", className: str }],
      [{ text: "" }],
      [{ text: "# Conectarse por SSH", className: cmt }],
      [{ text: "ssh", className: cmd }, { text: " -i aoshy-key.pem ec2-user@<ip-publica>" }],
      [{ text: "" }],
      [{ text: "# Desplegar la app", className: cmt }],
      [{ text: "docker", className: cmd }, { text: " run -d -p 80:3000 aoshy/portfolio:1.0" }],
    ],
  },
  {
    id: "gcp",
    label: "Google Cloud",
    icon: "🔵",
    file: "compute-engine.sh",
    description:
      "Compute Engine (VMs de Google Cloud): máquinas virtuales, redes y despliegues en GCP.",
    code: [
      [{ text: "# Crear una VM en Compute Engine", className: cmt }],
      [{ text: "gcloud compute instances create", className: cmd }, { text: " aoshy-vm \\" }],
      [{ text: "  --zone", className: key }, { text: "=" }, { text: "us-central1-a", className: str }, { text: " \\" }],
      [{ text: "  --machine-type", className: key }, { text: "=" }, { text: "e2-medium", className: str }, { text: " \\" }],
      [{ text: "  --image-family", className: key }, { text: "=" }, { text: "debian-12", className: str }, { text: " \\" }],
      [{ text: "  --tags", className: key }, { text: "=" }, { text: "http-server", className: str }],
      [{ text: "" }],
      [{ text: "# Abrir el puerto 80", className: cmt }],
      [{ text: "gcloud compute firewall-rules create", className: cmd }, { text: " allow-http \\" }],
      [{ text: "  --allow", className: key }, { text: "=" }, { text: "tcp:80", className: str }],
      [{ text: "" }],
      [{ text: "# Conectarse a la VM", className: cmt }],
      [{ text: "gcloud compute ssh", className: cmd }, { text: " aoshy-vm --zone=us-central1-a" }],
    ],
  },
];

const services = [
  { icon: "☸️", name: "Kubernetes", detail: "Orquestación de contenedores" },
  { icon: "🟠", name: "AWS EC2", detail: "Instancias y despliegues" },
  { icon: "🔵", name: "GCP Compute Engine", detail: "VMs en Google Cloud" },
  { icon: "🐳", name: "Docker", detail: "Contenedores y imágenes" },
];

export default function Cloud() {
  const [active, setActive] = useState<CloudTab>(tabs[0]);

  return (
    <section id="cloud" className="section-container">
      <Reveal>
        <span className="section-tag">Cloud &amp; DevOps</span>
        <h2 className="section-title">Infraestructura en la nube</h2>
        <p className="max-w-2xl text-ink-300">
          Experiencia práctica con Kubernetes, instancias EC2 de AWS y máquinas
          virtuales de Google Cloud (Compute Engine).
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Tarjetas de servicios */}
        <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={0.1 + i * 0.08}>
              <div className="card flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blurple/20 to-grape/20 text-2xl">
                  {service.icon}
                </span>
                <div>
                  <p className="font-semibold text-white">{service.name}</p>
                  <p className="text-sm text-ink-300">{service.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Editor de código con pestañas */}
        <Reveal delay={0.2}>
          <div className="card overflow-hidden !p-0 hover:!translate-y-0">
            <div className="flex flex-wrap items-center gap-1 border-b border-ink-600/50 bg-ink-900/80 px-3 pt-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab)}
                  className={`flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    active.id === tab.id
                      ? "bg-ink-800 text-white"
                      : "text-ink-400 hover:bg-ink-800/50 hover:text-ink-200"
                  }`}
                >
                  <span aria-hidden>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between border-b border-ink-600/30 px-5 py-2.5">
                  <span className="font-mono text-xs text-ink-400">
                    {active.file}
                  </span>
                  <span className="rounded-md bg-blurple/15 px-2 py-0.5 text-xs font-medium text-blurple-light">
                    {active.label}
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
                  {active.code.map((line, li) => (
                    <div key={li} className="flex">
                      <span className="mr-4 w-6 select-none text-right text-ink-500">
                        {li + 1}
                      </span>
                      <code className="text-ink-200">
                        {line.map((tok, ti) => (
                          <span key={ti} className={tok.className}>
                            {tok.text}
                          </span>
                        ))}
                      </code>
                    </div>
                  ))}
                </pre>
                <p className="border-t border-ink-600/30 px-5 py-3 text-sm text-ink-300">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

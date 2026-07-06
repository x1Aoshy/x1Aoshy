"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import PulseDot from "./PulseDot";
import { useI18n, type Lang } from "@/lib/i18n";

type CloudTab = {
  id: string;
  label: string;
  color: string;
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

const copy = {
  es: {
    tag: "Cloud & DevOps",
    title: "Infraestructura en la nube",
    desc: "Experiencia práctica con Kubernetes, instancias EC2 de AWS y máquinas virtuales de Google Cloud (Compute Engine).",
    k8sDesc:
      "Orquestación de contenedores: deployments, servicios y escalado automático de aplicaciones.",
    awsDesc:
      "Instancias EC2 en AWS: creación, configuración de seguridad y despliegue de aplicaciones.",
    gcpDesc:
      "Compute Engine (VMs de Google Cloud): máquinas virtuales, redes y despliegues en GCP.",
    awsComments: [
      "# Lanzar una instancia EC2",
      "# Conectarse por SSH",
      "# Desplegar la app",
    ],
    gcpComments: [
      "# Crear una VM en Compute Engine",
      "# Abrir el puerto 80",
      "# Conectarse a la VM",
    ],
    services: [
      "Orquestación de contenedores",
      "Instancias y despliegues",
      "VMs en Google Cloud",
      "Contenedores e imágenes",
    ],
  },
  en: {
    tag: "Cloud & DevOps",
    title: "Cloud infrastructure",
    desc: "Hands-on experience with Kubernetes, AWS EC2 instances and Google Cloud virtual machines (Compute Engine).",
    k8sDesc:
      "Container orchestration: deployments, services and automatic application scaling.",
    awsDesc:
      "EC2 instances on AWS: creation, security configuration and application deployment.",
    gcpDesc:
      "Compute Engine (Google Cloud VMs): virtual machines, networking and deployments on GCP.",
    awsComments: [
      "# Launch an EC2 instance",
      "# Connect via SSH",
      "# Deploy the app",
    ],
    gcpComments: [
      "# Create a Compute Engine VM",
      "# Open port 80",
      "# Connect to the VM",
    ],
    services: [
      "Container orchestration",
      "Instances and deployments",
      "VMs on Google Cloud",
      "Containers and images",
    ],
  },
} as const;

function buildTabs(lang: Lang): CloudTab[] {
  const t = copy[lang];
  return [
    {
      id: "k8s",
      label: "Kubernetes",
      color: "bg-[#326CE5]",
      file: "deployment.yaml",
      description: t.k8sDesc,
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
      color: "bg-[#FF9900]",
      file: "launch-ec2.sh",
      description: t.awsDesc,
      code: [
        [{ text: t.awsComments[0], className: cmt }],
        [{ text: "aws ec2 run-instances", className: cmd }, { text: " \\" }],
        [{ text: "  --image-id", className: key }, { text: " " }, { text: "ami-0abcdef1234567890", className: str }, { text: " \\" }],
        [{ text: "  --instance-type", className: key }, { text: " " }, { text: "t3.micro", className: str }, { text: " \\" }],
        [{ text: "  --key-name", className: key }, { text: " " }, { text: "aoshy-key", className: str }, { text: " \\" }],
        [{ text: "  --security-group-ids", className: key }, { text: " " }, { text: "sg-web", className: str }],
        [{ text: "" }],
        [{ text: t.awsComments[1], className: cmt }],
        [{ text: "ssh", className: cmd }, { text: " -i aoshy-key.pem ec2-user@<ip-publica>" }],
        [{ text: "" }],
        [{ text: t.awsComments[2], className: cmt }],
        [{ text: "docker", className: cmd }, { text: " run -d -p 80:3000 aoshy/portfolio:1.0" }],
      ],
    },
    {
      id: "gcp",
      label: "Google Cloud",
      color: "bg-[#4285F4]",
      file: "compute-engine.sh",
      description: t.gcpDesc,
      code: [
        [{ text: t.gcpComments[0], className: cmt }],
        [{ text: "gcloud compute instances create", className: cmd }, { text: " aoshy-vm \\" }],
        [{ text: "  --zone", className: key }, { text: "=" }, { text: "us-central1-a", className: str }, { text: " \\" }],
        [{ text: "  --machine-type", className: key }, { text: "=" }, { text: "e2-medium", className: str }, { text: " \\" }],
        [{ text: "  --image-family", className: key }, { text: "=" }, { text: "debian-12", className: str }, { text: " \\" }],
        [{ text: "  --tags", className: key }, { text: "=" }, { text: "http-server", className: str }],
        [{ text: "" }],
        [{ text: t.gcpComments[1], className: cmt }],
        [{ text: "gcloud compute firewall-rules create", className: cmd }, { text: " allow-http \\" }],
        [{ text: "  --allow", className: key }, { text: "=" }, { text: "tcp:80", className: str }],
        [{ text: "" }],
        [{ text: t.gcpComments[2], className: cmt }],
        [{ text: "gcloud compute ssh", className: cmd }, { text: " aoshy-vm --zone=us-central1-a" }],
      ],
    },
  ];
}

const serviceMeta = [
  { color: "bg-[#326CE5]", name: "Kubernetes" },
  { color: "bg-[#FF9900]", name: "AWS EC2" },
  { color: "bg-[#4285F4]", name: "GCP Compute Engine" },
  { color: "bg-[#2496ED]", name: "Docker" },
];

export default function Cloud() {
  const { lang } = useI18n();
  const t = copy[lang];
  const tabs = buildTabs(lang);
  const [activeId, setActiveId] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <section id="cloud" className="section-container">
      <Reveal>
        <span className="section-tag">{t.tag}</span>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>
      </Reveal>

      <div className="mt-8 grid gap-6 md:mt-12 lg:grid-cols-[1fr_1.4fr] lg:gap-8">
        {/* Tarjetas de servicios */}
        <div className="grid content-start gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
          {serviceMeta.map((service, i) => (
            <Reveal key={service.name} delay={0.1 + i * 0.08}>
              <div className="card flex items-center gap-4 p-4 sm:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ink-700 bg-ink-950">
                  <PulseDot color={service.color} delay={i * 0.35} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white sm:text-base">
                    {service.name}
                  </p>
                  <p className="truncate text-xs text-ink-400 sm:text-sm">
                    {t.services[i]}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Editor de código con pestañas */}
        <Reveal delay={0.2}>
          <div className="overflow-hidden rounded-lg border border-ink-700 bg-ink-900">
            <div className="flex items-center gap-1 overflow-x-auto border-b border-ink-700 bg-ink-950 px-3 pt-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-md border-x border-t px-3.5 py-2.5 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
                    active.id === tab.id
                      ? "border-ink-700 bg-ink-900 text-white"
                      : "border-transparent text-ink-400 hover:text-ink-200"
                  }`}
                >
                  <PulseDot color={tab.color} pulse={active.id === tab.id} />
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
                <div className="flex items-center justify-between border-b border-ink-700 px-4 py-2.5 sm:px-5">
                  <span className="font-mono text-xs text-ink-400">
                    {active.file}
                  </span>
                  <span className="rounded border border-blurple/40 px-2 py-0.5 font-mono text-xs text-blurple-light">
                    {active.label}
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-[13px]">
                  {active.code.map((line, li) => (
                    <div key={li} className="flex">
                      <span className="mr-3 w-5 select-none text-right text-ink-500 sm:mr-4 sm:w-6">
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
                <p className="border-t border-ink-700 px-4 py-3 text-sm text-ink-300 sm:px-5">
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

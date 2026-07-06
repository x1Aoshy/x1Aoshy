"use client";

import { useState } from "react";
import { useI18n, type Lang } from "@/lib/i18n";

const copy = {
  es: {
    links: [
      { href: "#inicio", label: "Inicio" },
      { href: "#sobre-mi", label: "Sobre mí" },
      { href: "#stack", label: "Stack" },
      { href: "#cloud", label: "Cloud & DevOps" },
      { href: "#proyectos", label: "Proyectos" },
      { href: "#experiencia", label: "Experiencia" },
    ],
    contact: "Contacto",
    openMenu: "Abrir menú",
  },
  en: {
    links: [
      { href: "#inicio", label: "Home" },
      { href: "#sobre-mi", label: "About" },
      { href: "#stack", label: "Stack" },
      { href: "#cloud", label: "Cloud & DevOps" },
      { href: "#proyectos", label: "Projects" },
      { href: "#experiencia", label: "Experience" },
    ],
    contact: "Contact",
    openMenu: "Open menu",
  },
} as const;

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div
      className={`flex items-center overflow-hidden rounded-md border border-ink-700 font-mono text-[11px] ${className}`}
    >
      {(["es", "en"] as Lang[]).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2 py-1 uppercase transition-colors ${
            lang === code
              ? "bg-ink-800 text-white"
              : "text-ink-400 hover:text-ink-200"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang } = useI18n();
  const t = copy[lang];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-800 bg-ink-950">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:px-8 md:px-12">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-ink-700 bg-ink-900 font-mono text-[11px] font-semibold text-blurple-light">
            HC
          </span>
          <span className="text-sm font-medium text-white">
            hian<span className="text-ink-400">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {t.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-1.5 text-[13px] text-ink-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <LangSwitch />
          </li>
          <li className="ml-3">
            <a
              href="#contacto"
              className="rounded-md bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-950 transition-colors hover:bg-ink-200"
            >
              {t.contact}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitch />
          <button
            aria-label={t.openMenu}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md text-ink-200 hover:bg-ink-900"
          >
            <span
              className={`h-px w-[18px] bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span className={`h-px w-[18px] bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-[18px] bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink-800 bg-ink-950 md:hidden">
          <ul className="flex flex-col px-5 py-3">
            {[...t.links, { href: "#contacto", label: t.contact }].map(
              (link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ink-800/60 px-1 py-3 text-sm text-ink-200 last:border-0 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

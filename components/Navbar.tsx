"use client";

import { useState } from "react";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#stack", label: "Stack" },
  { href: "#cloud", label: "Cloud & DevOps" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-1.5 text-[13px] text-ink-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#contacto"
              className="rounded-md bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-950 transition-colors hover:bg-ink-200"
            >
              Contacto
            </a>
          </li>
        </ul>

        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md text-ink-200 hover:bg-ink-900 md:hidden"
        >
          <span
            className={`h-px w-[18px] bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span className={`h-px w-[18px] bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-[18px] bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-800 bg-ink-950 md:hidden">
          <ul className="flex flex-col px-5 py-3">
            {[...links, { href: "#contacto", label: "Contacto" }].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink-800/60 px-1 py-3 text-sm text-ink-200 last:border-0 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

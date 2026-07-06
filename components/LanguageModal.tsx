"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useI18n, type Lang } from "@/lib/i18n";

const options: { lang: Lang; code: string; name: string; hint: string }[] = [
  { lang: "es", code: "ES", name: "Español", hint: "Ver el sitio en español" },
  { lang: "en", code: "EN", name: "English", hint: "View the site in English" },
];

export default function LanguageModal() {
  const { chosen, setLang } = useI18n();

  return (
    <AnimatePresence>
      {chosen === false && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/85 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Selecciona tu idioma / Choose your language"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-sm rounded-lg border border-ink-700 bg-ink-900 p-6 sm:p-8"
          >
            <span className="section-tag">Idioma / Language</span>
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Elige tu idioma
            </h2>
            <p className="mt-1 text-sm text-ink-400">Choose your language</p>

            <div className="mt-6 grid gap-3">
              {options.map((option) => (
                <button
                  key={option.lang}
                  onClick={() => setLang(option.lang)}
                  className="group flex items-center gap-4 rounded-md border border-ink-700 bg-ink-950 p-4 text-left transition-colors hover:border-blurple/60 hover:bg-ink-900"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-ink-700 bg-ink-900 font-mono text-xs font-semibold text-blurple-light transition-colors group-hover:border-blurple/60">
                    {option.code}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">
                      {option.name}
                    </span>
                    <span className="block truncate text-xs text-ink-400">
                      {option.hint}
                    </span>
                  </span>
                  <span className="ml-auto text-ink-500 transition-all group-hover:translate-x-0.5 group-hover:text-blurple-light">
                    →
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

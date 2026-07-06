"use client";

import { useI18n, type Lang } from "@/lib/i18n";

// Selector ES/EN compartido entre la web y el panel admin.
// La preferencia vive en el LanguageProvider global (localStorage).
export default function LangSwitch({ className = "" }: { className?: string }) {
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

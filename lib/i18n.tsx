"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "aoshy-lang";

type I18nContext = {
  lang: Lang;
  // null = aún no sabemos (antes de montar), evita parpadeos y errores de hidratación
  chosen: boolean | null;
  setLang: (lang: Lang) => void;
};

const Ctx = createContext<I18nContext>({
  lang: "es",
  chosen: null,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [chosen, setChosen] = useState<boolean | null>(null);

  // Lee la preferencia guardada tras montar (localStorage no existe en SSR)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") {
        setLangState(saved);
        setChosen(true);
      } else {
        setChosen(false);
      }
    } catch {
      setChosen(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    setChosen(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // sin almacenamiento disponible: la elección dura la sesión
    }
  };

  return (
    <Ctx.Provider value={{ lang, chosen, setLang }}>{children}</Ctx.Provider>
  );
}

export function useI18n() {
  return useContext(Ctx);
}

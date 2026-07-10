"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";

// Pulpo mascota original: cabeza redonda, ojos grandes que siguen el cursor,
// tentáculos que se mecen y un globo de diálogo al hacer clic.
const MESSAGES = {
  es: [
    "¡Hola! 🐙",
    "¡Sigue bajando!",
    "console.log('hey')",
    "¡Hecho con IA + café!",
    "¿Un bug? Yo no fui 👀",
    "8 brazos, 0 deadlines",
  ],
  en: [
    "Hi! 🐙",
    "Keep scrolling!",
    "console.log('hey')",
    "Built with AI + coffee!",
    "A bug? Wasn't me 👀",
    "8 arms, 0 deadlines",
  ],
} as const;

// Tentáculos como curvas Bézier; dos grupos que se mecen en contrafase.
const TENTACLES_A = [
  "M27 53 C25 68 13 72 16 84",
  "M46 63 C46 78 41 82 43 92",
  "M63 60 C64 74 72 78 70 89",
];
const TENTACLES_B = [
  "M37 60 C36 74 28 78 30 89",
  "M54 63 C54 78 59 82 57 92",
  "M73 53 C75 68 87 72 84 84",
];

const BLURPLE = "#5865F2";
const BLURPLE_LIGHT = "#7983F5";
const BLURPLE_DARK = "#4752C4";
const INK_DARK = "#151618";

function TentacleGroup({ paths }: { paths: string[] }) {
  return (
    <>
      {paths.map((d) => (
        <g key={d}>
          {/* Contorno oscuro debajo del trazo principal */}
          <path
            d={d}
            fill="none"
            stroke={BLURPLE_DARK}
            strokeWidth={9}
            strokeLinecap="round"
          />
          <path
            d={d}
            fill="none"
            stroke={BLURPLE}
            strokeWidth={6}
            strokeLinecap="round"
          />
        </g>
      ))}
    </>
  );
}

export default function Octo() {
  const { lang } = useI18n();
  const reduced = useReducedMotion() ?? false;
  const controls = useAnimationControls();

  const rootRef = useRef<HTMLButtonElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [bubble, setBubble] = useState<string | null>(null);
  const [bubbleKey, setBubbleKey] = useState(0);

  // Las pupilas siguen el cursor: mousemove global acelerado con rAF,
  // sin re-render (se muta el atributo transform del <g> directamente).
  useEffect(() => {
    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = rootRef.current;
        const pupils = pupilsRef.current;
        if (!el || !pupils) return;
        const rect = el.getBoundingClientRect();
        const dx = lastX - (rect.left + rect.width / 2);
        const dy = lastY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < 1) return;
        // Máx ~2.5px de desplazamiento en la dirección del cursor
        const k = (Math.min(dist, 160) / 160) * 2.5;
        const tx = ((dx / dist) * k).toFixed(2);
        const ty = ((dy / dist) * k).toFixed(2);
        pupils.setAttribute("transform", `translate(${tx} ${ty})`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Limpia el temporizador del globo al desmontar
  useEffect(() => {
    return () => {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    };
  }, []);

  const handleClick = () => {
    const pool = MESSAGES[lang];
    setBubble(pool[Math.floor(Math.random() * pool.length)]);
    setBubbleKey((k) => k + 1);
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), 2200);

    if (!reduced) {
      void controls.start({
        rotate: [0, -10, 9, -6, 4, 0],
        y: [0, -9, 0, -3, 0],
        transition: { duration: 0.55, ease: "easeInOut" },
      });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 hidden md:block">
      {/* Globo de diálogo */}
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubbleKey}
            role="status"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none absolute bottom-full right-0 mb-3 select-none whitespace-nowrap rounded-lg border border-ink-700 bg-ink-900 px-3 py-1.5 font-mono text-xs text-ink-100 shadow-lg"
          >
            {bubble}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 right-7 h-2 w-2 rotate-45 border-b border-r border-ink-700 bg-ink-900"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flotación suave de todo el pulpo */}
      <motion.div
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.button
          ref={rootRef}
          type="button"
          onClick={handleClick}
          aria-label={lang === "es" ? "Mascota" : "Mascot"}
          whileHover={reduced ? undefined : { scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 16 }}
          className="block cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blurple focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        >
          <motion.svg
            width={90}
            height={90}
            viewBox="0 0 100 100"
            aria-hidden="true"
            animate={controls}
            style={{ originX: 0.5, originY: 0.6 }}
            className="drop-shadow-[0_6px_18px_rgba(88,101,242,0.35)]"
          >
            {/* Tentáculos (detrás de la cabeza), dos grupos en contrafase */}
            <motion.g
              style={{ originX: 0.5, originY: 0 }}
              animate={reduced ? undefined : { rotate: [-2.4, 2.4] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <TentacleGroup paths={TENTACLES_A} />
            </motion.g>
            <motion.g
              style={{ originX: 0.5, originY: 0 }}
              animate={reduced ? undefined : { rotate: [2.4, -2.4] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <TentacleGroup paths={TENTACLES_B} />
            </motion.g>

            {/* Cabeza */}
            <ellipse
              cx={50}
              cy={40}
              rx={28}
              ry={26}
              fill={BLURPLE}
              stroke={BLURPLE_DARK}
              strokeWidth={2.5}
            />
            {/* Brillo superior */}
            <ellipse
              cx={38}
              cy={24}
              rx={7}
              ry={4.5}
              fill={BLURPLE_LIGHT}
              opacity={0.7}
            />
            {/* Panza clara */}
            <ellipse
              cx={50}
              cy={58}
              rx={13}
              ry={7}
              fill={BLURPLE_LIGHT}
              opacity={0.5}
            />
            {/* Mejillas */}
            <ellipse cx={30} cy={45} rx={4.5} ry={3} fill={BLURPLE_LIGHT} />
            <ellipse cx={70} cy={45} rx={4.5} ry={3} fill={BLURPLE_LIGHT} />

            {/* Ojos: el grupo entero parpadea (scaleY) cada pocos segundos */}
            <motion.g
              style={{ originX: 0.5, originY: 0.5 }}
              animate={reduced ? undefined : { scaleY: [1, 1, 0.08, 1] }}
              transition={{
                duration: 0.35,
                times: [0, 0.15, 0.55, 1],
                repeat: Infinity,
                repeatDelay: 3.4,
                ease: "easeInOut",
              }}
            >
              <circle
                cx={39}
                cy={38}
                r={8}
                fill="#FFFFFF"
                stroke={BLURPLE_DARK}
                strokeWidth={1.5}
              />
              <circle
                cx={61}
                cy={38}
                r={8}
                fill="#FFFFFF"
                stroke={BLURPLE_DARK}
                strokeWidth={1.5}
              />
              {/* Pupilas: este grupo se traslada hacia el cursor */}
              <g ref={pupilsRef}>
                <circle cx={39} cy={38} r={3.4} fill={INK_DARK} />
                <circle cx={61} cy={38} r={3.4} fill={INK_DARK} />
                <circle cx={37.8} cy={36.8} r={1.1} fill="#FFFFFF" />
                <circle cx={59.8} cy={36.8} r={1.1} fill="#FFFFFF" />
              </g>
            </motion.g>

            {/* Boca feliz */}
            <path
              d="M44 51 Q50 57 56 51"
              fill="none"
              stroke={INK_DARK}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.button>
      </motion.div>
    </div>
  );
}

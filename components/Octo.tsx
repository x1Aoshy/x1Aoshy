"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

// Pulpo pixel-art que se pasea por la pantalla. Sprite de dos frames
// (los tentáculos alternan) dibujado como rects en una cuadrícula SVG,
// estilo retro para que pegue con la estética dev del sitio.

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

// Mapa de pixeles: . vacío · B cuerpo · L brillo · D sombra · W ojo · K oscuro
const HEAD = [
  "....DDDD....",
  "..DDBBBBDD..",
  ".DBBBBBBBBD.",
  ".DBLBBBBLBD.",
  "DBWWBBBBWWBD",
  "DBWKBBBBWKBD",
  "DBBBBBBBBBBD",
  ".DBBBKKBBBD.",
  ".DBBBBBBBBD.",
];

const TENTACLES_A = [
  ".B..B..B..B.",
  "B...B..B...B",
  "B..B....B..B",
];

const TENTACLES_B = [
  ".B..B..B..B.",
  "..B.B..B.B..",
  "..B..BB..B..",
];

const COLORS: Record<string, string> = {
  B: "#5865F2",
  L: "#7983F5",
  D: "#4752C4",
  W: "#FFFFFF",
  K: "#151618",
};

function Sprite({ frame }: { frame: number }) {
  const rows = [...HEAD, ...(frame === 0 ? TENTACLES_A : TENTACLES_B)];
  return (
    <svg
      width={72}
      height={72}
      viewBox="0 0 12 12"
      aria-hidden
      style={{ shapeRendering: "crispEdges" }}
      className="drop-shadow-[0_4px_14px_rgba(88,101,242,0.35)]"
    >
      {rows.map((row, y) =>
        row.split("").map((ch, x) =>
          ch === "." ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={COLORS[ch]} />
          ),
        ),
      )}
    </svg>
  );
}

const SPRITE = 72;

export default function Octo() {
  const { lang } = useI18n();
  const reduced = useReducedMotion() ?? false;

  const [ready, setReady] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dir, setDir] = useState(1); // 1 mira a la derecha, -1 a la izquierda
  const [frame, setFrame] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const [bubbleKey, setBubbleKey] = useState(0);

  const hoveredRef = useRef(false);
  const posRef = useRef(pos);
  posRef.current = pos;
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Posición inicial: esquina inferior derecha
  useEffect(() => {
    setPos({
      x: window.innerWidth - SPRITE - 36,
      y: window.innerHeight - SPRITE - 40,
    });
    setReady(true);
  }, []);

  // Paseo: cada pocos segundos elige un punto de la pantalla y nada
  // hacia él (se pausa mientras el cursor está encima o hay globo)
  useEffect(() => {
    if (!ready || reduced) return;
    let timer: ReturnType<typeof setTimeout>;

    const wander = () => {
      timer = setTimeout(() => {
        if (!hoveredRef.current) {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const x = 16 + Math.random() * Math.max(vw - SPRITE - 48, 1);
          // Evita la franja del navbar y deja margen abajo
          const y = vh * 0.22 + Math.random() * Math.max(vh * 0.78 - SPRITE - 40, 1);
          setDir(x >= posRef.current.x ? 1 : -1);
          setPos({ x, y });
        }
        wander();
      }, 4200 + Math.random() * 3800);
    };

    wander();
    return () => clearTimeout(timer);
  }, [ready, reduced]);

  // Frames del sprite: los tentáculos alternan (nado retro)
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setFrame((f) => 1 - f), 380);
    return () => clearInterval(id);
  }, [reduced]);

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
  };

  if (!ready) return null;

  return (
    <motion.div
      className="fixed left-0 top-0 z-40 hidden md:block"
      initial={false}
      animate={{ x: pos.x, y: pos.y }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "tween", ease: "easeInOut", duration: 2.6 }
      }
    >
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
            className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 select-none whitespace-nowrap rounded-md border border-ink-700 bg-ink-900 px-3 py-1.5 font-mono text-xs text-ink-100 shadow-lg"
          >
            {bubble}
            <span
              aria-hidden
              className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-ink-700 bg-ink-900"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => (hoveredRef.current = true)}
        onMouseLeave={() => (hoveredRef.current = false)}
        aria-label={lang === "es" ? "Mascota" : "Mascot"}
        whileHover={reduced ? undefined : { scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 320, damping: 16 }}
        className="block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blurple focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
      >
        {/* Voltea el sprite según la dirección del paseo */}
        <motion.div
          animate={{ scaleX: dir, y: reduced ? 0 : [0, -4, 0] }}
          transition={{
            scaleX: { duration: 0.25 },
            y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Sprite frame={frame} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

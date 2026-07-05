import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en Discord, aplicada en plano
        blurple: {
          DEFAULT: "#5865F2",
          light: "#7983F5",
          dark: "#4752C4",
        },
        grape: {
          DEFAULT: "#7C3AED",
          dark: "#5B21B6",
          deeper: "#3B0764",
        },
        ink: {
          950: "#0E0F10",
          900: "#151618",
          850: "#1B1C1F",
          800: "#222327",
          700: "#2A2B30",
          600: "#35373D",
          500: "#4E5058",
          400: "#6D6F78",
          300: "#949BA4",
          200: "#B5BAC1",
          100: "#DBDEE1",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

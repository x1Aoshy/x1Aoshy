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
        // Paleta inspirada en Discord
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
          950: "#111214", // casi negro
          900: "#1E1F22", // sidebar discord
          800: "#2B2D31", // panel discord
          700: "#313338", // chat discord
          600: "#383A40",
          500: "#4E5058",
          400: "#6D6F78",
          300: "#949BA4",
          200: "#B5BAC1",
          100: "#DBDEE1",
        },
      },
      fontFamily: {
        sans: [
          "gg sans",
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
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 12s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-24px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(88, 101, 242, 0.5)",
        "glow-purple": "0 0 40px -10px rgba(124, 58, 237, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;

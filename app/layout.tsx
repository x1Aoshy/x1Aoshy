import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Letra de carta para la marca del header
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aoshy.dev"),
  title: {
    default: "Hian Chang — Product Engineer with AI",
    template: "%s · Hian Chang",
  },
  description:
    "Hian Chang (Aoshy Dev): Full Stack Developer & Product Engineer with AI. Java, C#, JavaScript, PHP, AWS, Google Cloud, Kubernetes y agentes LLM.",
  keywords: [
    "Hian Chang",
    "Aoshy Dev",
    "Full Stack Developer",
    "Product Engineer",
    "AI",
    "Prompt Engineering",
    "LLM agents",
    "AWS",
    "Google Cloud",
    "Kubernetes",
  ],
  authors: [{ name: "Hian Chang" }],
  openGraph: {
    title: "Hian Chang — Product Engineer with AI",
    description:
      "Full Stack Developer & Product Engineer with AI · Java · C# · JavaScript · PHP · AWS · GCP · Kubernetes · LLM agents",
    type: "website",
    siteName: "Hian Chang · Aoshy Dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hian Chang — Product Engineer with AI",
    description:
      "Full Stack Developer & Product Engineer with AI · AWS · GCP · Kubernetes · LLM agents",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body>
        {/* Idioma global: compartido entre la web y el panel /admin */}
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

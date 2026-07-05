import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hian Chang — Full Stack Developer",
  description:
    "Portafolio de Hian Chang (Aoshy Dev): Full Stack Junior Developer. Java, C#, JavaScript, PHP, AWS, Google Cloud, Kubernetes y más.",
  openGraph: {
    title: "Hian Chang — Full Stack Developer",
    description:
      "Full Stack Junior Developer · Java · C# · JavaScript · PHP · AWS · Google Cloud · Kubernetes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

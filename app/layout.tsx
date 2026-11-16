import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Space_Grotesk, DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const reading = Space_Grotesk({ subsets: ["latin"], variable: "--font-reading", display: "swap" });
const mono = IBM_Plex_Mono({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-mono", display: "swap", preload: false });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap", preload: false });
const heading = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap", preload: false });
export const metadata: Metadata = {
  title: "Noel Perland — Full-stack developer",
  description:
    "Noel Perland is a full-stack developer in Stockholm. Explore six projects spanning booking systems, game telemetry, AI workflows, browser games, and health tracking.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${reading.variable} ${mono.variable} ${body.variable} ${heading.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=(localStorage.getItem('portfolio2-theme')??localStorage.getItem('np-theme'))==='dark'?'dark':'light'}catch{}` }} /></head>
      <body>{children}</body>
    </html>
  );
}

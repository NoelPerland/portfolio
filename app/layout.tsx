import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Noel Perland — Full-stack developer",
  description:
    "Noel Perland is a full-stack developer in Stockholm. Explore six projects spanning booking systems, game telemetry, AI workflows, browser games, and health tracking.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

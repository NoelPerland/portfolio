import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Noel Perland — Full-stack developer",
  description:
    "Practical AI tools with real backends. Explore Noel Perland’s full-stack portfolio, live applications and source code.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

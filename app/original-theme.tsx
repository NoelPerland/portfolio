"use client";

import { useEffect } from "react";

export default function OriginalTheme() {
  useEffect(() => {
    const toggle = document.querySelector<HTMLButtonElement>(
      ".original-portfolio .theme-toggle",
    );
    const setTheme = (theme: "light" | "dark") => {
      document.documentElement.dataset.theme = theme;
      const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
      toggle?.setAttribute("aria-label", label);
      toggle?.setAttribute("title", label);
      try {
        localStorage.setItem("portfolio2-theme", theme);
      } catch {
        // Theme still works when browser storage is unavailable.
      }
    };
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("portfolio2-theme") ?? localStorage.getItem("np-theme");
    } catch {
      // Default to the original light theme.
    }
    setTheme(saved === "dark" ? "dark" : "light");
    const changeTheme = () =>
      setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    toggle?.addEventListener("click", changeTheme);
    return () => toggle?.removeEventListener("click", changeTheme);
  }, []);

  return null;
}

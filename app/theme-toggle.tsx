"use client";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const value = localStorage.getItem("np-theme") === "dark";
    setDark(value);
    document.documentElement.dataset.theme = value ? "dark" : "light";
  }, []);
  return (
    <button
      className="theme-toggle"
      aria-label={dark ? "Use light theme" : "Use dark theme"}
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.dataset.theme = next ? "dark" : "light";
        localStorage.setItem("np-theme", next ? "dark" : "light");
      }}
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}

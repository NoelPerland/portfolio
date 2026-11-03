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
    const workSection = document.querySelector<HTMLElement>(".original-portfolio .work-section");
    const carousel = workSection?.querySelector<HTMLElement>(".works");
    const slides = [...(carousel?.querySelectorAll<HTMLElement>(".work") ?? [])];
    const choices = [...(workSection?.querySelectorAll<HTMLButtonElement>(".project-index button") ?? [])];
    const counter = workSection?.querySelector<HTMLElement>("#slide-current");
    const announcement = workSection?.querySelector<HTMLElement>("#slide-announcement");
    const projectIndex = workSection?.querySelector<HTMLElement>(".project-index");
    let active = 0;
    const show = (next: number) => {
      if (!slides.length || next === active) return;
      const index = (next + slides.length) % slides.length;
      const focusWasInside = slides[active].contains(document.activeElement);
      slides[active].hidden = true;
      choices[active].removeAttribute("aria-current");
      slides[index].hidden = false;
      choices[index].setAttribute("aria-current", "true");
      counter!.textContent = String(index + 1).padStart(2, "0");
      announcement!.textContent = `${slides[index].querySelector("h3")?.textContent}, ${index + 1} of ${slides.length}`;
      projectIndex?.scrollTo({ left: choices[index].offsetLeft - projectIndex.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      if (focusWasInside) slides[index].querySelector<HTMLAnchorElement>(".project-stage")?.focus();
      active = index;
    };
    const onChoice = (event: Event) => show(Number((event.currentTarget as HTMLButtonElement).dataset.slide));
    const onDirection = (event: Event) => show(active + Number((event.currentTarget as HTMLButtonElement).dataset.direction));
    choices.forEach(button => button.addEventListener("click", onChoice));
    const arrows = [...(workSection?.querySelectorAll<HTMLButtonElement>(".carousel-controls button") ?? [])];
    arrows.forEach(button => button.addEventListener("click", onDirection));
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      show(active + (event.key === "ArrowRight" ? 1 : -1));
    };
    workSection?.addEventListener("keydown", onKey);
    let touchX = 0;
    let touchY = 0;
    const onTouchStart = (event: TouchEvent) => { touchX = event.touches[0].clientX; touchY = event.touches[0].clientY; };
    const onTouchEnd = (event: TouchEvent) => {
      const dx = event.changedTouches[0].clientX - touchX;
      const dy = event.changedTouches[0].clientY - touchY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25) show(active + (dx < 0 ? 1 : -1));
    };
    carousel?.addEventListener("touchstart", onTouchStart, { passive: true });
    carousel?.addEventListener("touchend", onTouchEnd, { passive: true });
    const targets = document.querySelectorAll<HTMLElement>(".original-portfolio .work-section .section-heading, .original-portfolio .portfolio-about .about-copy, .original-portfolio .skills-section .section-heading");
    const reveal = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? null : new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        reveal?.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    targets.forEach(target => { if (reveal) { target.classList.add("reveal-ready"); reveal.observe(target); } });
    return () => {
      toggle?.removeEventListener("click", changeTheme);
      choices.forEach(button => button.removeEventListener("click", onChoice));
      arrows.forEach(button => button.removeEventListener("click", onDirection));
      workSection?.removeEventListener("keydown", onKey);
      carousel?.removeEventListener("touchstart", onTouchStart);
      carousel?.removeEventListener("touchend", onTouchEnd);
      reveal?.disconnect();
    };
  }, []);

  return null;
}

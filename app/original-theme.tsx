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
    };
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("portfolio2-theme") ?? localStorage.getItem("np-theme");
    } catch {
      // Fall back to the system preference when storage is unavailable.
    }
    let followsSystem = saved !== "dark" && saved !== "light";
    setTheme(saved === "dark" || saved === "light" ? saved : systemTheme.matches ? "dark" : "light");
    const onSystemTheme = () => {
      if (followsSystem) setTheme(systemTheme.matches ? "dark" : "light");
    };
    const changeTheme = () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      followsSystem = false;
      setTheme(next);
      try {
        localStorage.setItem("portfolio2-theme", next);
      } catch {
        // The explicit choice still works in this page without storage.
      }
    };
    systemTheme.addEventListener("change", onSystemTheme);
    toggle?.addEventListener("click", changeTheme);
    const workSection = document.querySelector<HTMLElement>(".original-portfolio .work-section");
    const carousel = workSection?.querySelector<HTMLElement>(".works");
    const slides = [...(carousel?.querySelectorAll<HTMLElement>(".work") ?? [])];
    const choices = [...(workSection?.querySelectorAll<HTMLButtonElement>(".project-index button") ?? [])];
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
      announcement!.textContent = `${slides[index].querySelector("h3")?.textContent}, ${index + 1} of ${slides.length}`;
      projectIndex?.scrollTo({ left: choices[index].offsetLeft - projectIndex.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      if (focusWasInside) slides[index].querySelector<HTMLAnchorElement>(".project-links a")?.focus();
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
    const skillsSection = document.querySelector<HTMLElement>(".original-portfolio .skills-section");
    const skillSlides = [...(skillsSection?.querySelectorAll<HTMLElement>(".skill-slide") ?? [])];
    const skillChoices = [...(skillsSection?.querySelectorAll<HTMLButtonElement>(".skills-index button") ?? [])];
    const skillArrows = [...(skillsSection?.querySelectorAll<HTMLButtonElement>(".skills-controls button") ?? [])];
    const skillAnnouncement = skillsSection?.querySelector<HTMLElement>("#skill-announcement");
    let activeSkill = 0;
    const showSkill = (next: number) => {
      if (!skillSlides.length) return;
      const index = (next + skillSlides.length) % skillSlides.length;
      if (index === activeSkill) return;
      const focusWasInside = skillSlides[activeSkill].contains(document.activeElement);
      skillSlides[activeSkill].hidden = true;
      skillChoices[activeSkill].removeAttribute("aria-current");
      skillSlides[index].hidden = false;
      skillChoices[index].setAttribute("aria-current", "true");
      if (skillAnnouncement) skillAnnouncement.textContent = `${skillChoices[index].textContent}, ${index + 1} of ${skillSlides.length}`;
      if (focusWasInside) skillSlides[index].querySelector<HTMLAnchorElement>(".skill-proof")?.focus();
      activeSkill = index;
    };
    const onSkillChoice = (event: Event) => showSkill(Number((event.currentTarget as HTMLButtonElement).dataset.skill));
    const onSkillDirection = (event: Event) => showSkill(activeSkill + Number((event.currentTarget as HTMLButtonElement).dataset.skillDirection));
    const onSkillKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      showSkill(activeSkill + (event.key === "ArrowRight" ? 1 : -1));
    };
    skillChoices.forEach(button => button.addEventListener("click", onSkillChoice));
    skillArrows.forEach(button => button.addEventListener("click", onSkillDirection));
    skillsSection?.addEventListener("keydown", onSkillKey);
    const skillCarousel = skillsSection?.querySelector<HTMLElement>(".skills-carousel");
    let skillTouchX = 0;
    let skillTouchY = 0;
    const onSkillTouchStart = (event: TouchEvent) => { skillTouchX = event.touches[0].clientX; skillTouchY = event.touches[0].clientY; };
    const onSkillTouchEnd = (event: TouchEvent) => {
      const dx = event.changedTouches[0].clientX - skillTouchX;
      const dy = event.changedTouches[0].clientY - skillTouchY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25) showSkill(activeSkill + (dx < 0 ? 1 : -1));
    };
    skillCarousel?.addEventListener("touchstart", onSkillTouchStart, { passive: true });
    skillCarousel?.addEventListener("touchend", onSkillTouchEnd, { passive: true });
    return () => {
      systemTheme.removeEventListener("change", onSystemTheme);
      toggle?.removeEventListener("click", changeTheme);
      choices.forEach(button => button.removeEventListener("click", onChoice));
      arrows.forEach(button => button.removeEventListener("click", onDirection));
      workSection?.removeEventListener("keydown", onKey);
      carousel?.removeEventListener("touchstart", onTouchStart);
      carousel?.removeEventListener("touchend", onTouchEnd);
      skillChoices.forEach(button => button.removeEventListener("click", onSkillChoice));
      skillArrows.forEach(button => button.removeEventListener("click", onSkillDirection));
      skillsSection?.removeEventListener("keydown", onSkillKey);
      skillCarousel?.removeEventListener("touchstart", onSkillTouchStart);
      skillCarousel?.removeEventListener("touchend", onSkillTouchEnd);
    };
  }, []);

  return null;
}

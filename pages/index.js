import Hero from "../components/Hero";
import TechSkills from "../components/TechSkills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <TechSkills />
      <Projects />
      <Contact />
    </div>
  );
}

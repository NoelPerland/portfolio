import ProjectCard from "./ProjectCard";
import { useProjects } from "../context/ProjectContext";

export default function Projects() {
  const { projects } = useProjects();
  return (
    <section
      id="projects"
      className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 text-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <h3 className="text-xl font-bold text-center mb-8">Comming soon</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

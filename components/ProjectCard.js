export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image container with centered content */}
      <div className="flex justify-center items-center w-full h-60 overflow-hidden rounded-t-lg">
        <img
          src={project.image || ""}
          alt={project.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-violet-500">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          View Project
        </a>
      </div>
    </div>
  );
}

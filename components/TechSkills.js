import {
  FaReact,
  FaNodeJs,
  FaCss3,
  FaJsSquare,
  FaGithub,
} from "react-icons/fa";

export default function TechSkills() {
  const skills = [
    { name: "React", icon: <FaReact className="w-8 h-8" /> },
    { name: "Node.js", icon: <FaNodeJs className="w-8 h-8" /> },
    { name: "CSS", icon: <FaCss3 className="w-8 h-8" /> },
    { name: "JavaScript", icon: <FaJsSquare className="w-8 h-8" /> },
    { name: "GitHub", icon: <FaGithub className="w-8 h-8" /> },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Tech Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">{skill.icon}</div>
              <p className="text-lg font-semibold">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

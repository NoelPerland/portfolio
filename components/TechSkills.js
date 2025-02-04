import {
  FaReact,
  FaNodeJs,
  FaJsSquare,
  FaGithub,
  FaHtml5,
  FaCss3,
  FaWordpress,
} from "react-icons/fa";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
import { VscSourceControl } from "react-icons/vsc";

export default function TechSkills() {
  const skills = [
    { name: "React", icon: <FaReact /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Tailwind", icon: <RiTailwindCssFill /> },
    { name: "JavaScript", icon: <FaJsSquare /> },
    { name: "GitHub", icon: <FaGithub /> },
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3 /> },
    { name: "WordPress", icon: <FaWordpress /> },
    { name: "Git", icon: <VscSourceControl /> },
    { name: "Next.js", icon: <RiNextjsFill /> },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <div className="container mx-auto text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Tech Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-28 h-28 bg-white rounded-md shadow-sm hover:shadow-md transform hover:scale-105 transition duration-300"
              >
                <div className="text-blue-500 text-xl">{skill.icon}</div>
                <p className="text-[10px] font-medium text-gray-600 mt-1">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

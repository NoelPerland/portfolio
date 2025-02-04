import { useState } from "react";
import { useProjects } from "../context/ProjectContext.js";

export default function Admin() {
  const { projects, addProject, editProject, deleteProject } = useProjects();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    tech: [],
    link: "",
    image: "", // Add image field to state
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a local URL for the uploaded image
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      editProject(formData.id, formData);
    } else {
      addProject({ ...formData, id: Date.now().toString() });
    }
    setFormData({
      id: "",
      title: "",
      description: "",
      tech: [],
      link: "",
      image: "",
    });
  };

  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-700">
      <div className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-2xl font-bold text-white text-center">
          Admin Page
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-8">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-1/2 p-2 border rounded bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-300 mx-auto block"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-1/2 p-2 border rounded bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-300 mx-auto block"
            required
          />
          <input
            type="text"
            placeholder="Tech (comma separated)"
            value={formData.tech.join(",")}
            onChange={(e) =>
              setFormData({ ...formData, tech: e.target.value.split(",") })
            }
            className="w-1/2 p-2 border rounded bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-300 mx-auto block"
            required
          />
          <input
            type="text"
            placeholder="Project Link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-1/2 p-2 border rounded bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-300 mx-auto block"
            required
          />

          {/* Add an input field to upload an image */}
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-1/2 p-2 border rounded bg-white/20 text-white focus:ring-2 focus:ring-blue-300 mx-auto block"
          />

          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mx-auto block"
          >
            {formData.id ? "Update Project" : "Add Project"}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-white/10 rounded-lg shadow-lg text-white"
            >
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="mt-4 max-w-full h-auto rounded-lg"
                />
              )}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setFormData(project)}
                  className="bg-yellow-400 px-4 py-2 rounded text-gray-900 hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

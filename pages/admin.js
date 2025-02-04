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
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      editProject(formData.id, formData);
    } else {
      addProject({ ...formData, id: Date.now().toString() });
    }
    setFormData({ id: "", title: "", description: "", tech: [], link: "" });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Tech (comma separated)"
          value={formData.tech.join(",")}
          onChange={(e) =>
            setFormData({ ...formData, tech: e.target.value.split(",") })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Project Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {formData.id ? "Update Project" : "Add Project"}
        </button>
      </form>
      <div className="mt-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border p-4 rounded-lg shadow-md mb-4"
          >
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="mt-2 text-gray-600">{project.description}</p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => setFormData(project)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(project.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

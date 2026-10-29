import { FaFolderOpen, FaPlus, FaTrash } from "react-icons/fa6";

const ProjectsForm = ({ data = [], onChange }) => {
  const addProject = () => {
    onChange([...data, { name: "", type: "", description: "" }]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg text-base-content font-bold">Projects</h3>
          <p className="text-gray-500 text-sm">
            Add projects you have worked on
          </p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="btn btn-primary btn-sm btn-outline"
        >
          <FaPlus size={12} />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 mt-5 text-base-content/50 border border-dashed border-base-300 rounded-box">
          <FaFolderOpen size={28} />
          <p className="text-sm">No projects added yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-5">
          {data.map((project, index) => (
            <div
              key={project._id || index}
              className="p-4 border border-base-300 rounded-box flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">Project #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="btn btn-ghost btn-xs text-error"
                  aria-label="Remove project"
                >
                  <FaTrash size={12} />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Project Name</label>
                  <input
                    type="text"
                    value={project.name || ""}
                    onChange={(e) =>
                      updateProject(index, "name", e.target.value)
                    }
                    placeholder="Project name"
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Type</label>
                  <input
                    type="text"
                    value={project.type || ""}
                    onChange={(e) =>
                      updateProject(index, "type", e.target.value)
                    }
                    placeholder="e.g. Personal, Academic, Freelance"
                    className="input w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder={"Describe what you built\nDescribe the result"}
                  className="textarea w-full resize-none"
                />
                <p className="text-xs text-base-content/50">
                  One point per line, each line becomes a bullet in the preview
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectsForm;

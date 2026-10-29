import { FaBriefcase, FaPlus, FaTrash } from "react-icons/fa6";

const ExperienceForm = ({ data = [], onChange }) => {
  const addExp = () => {
    const newExp = {
      company: "",
      potition: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    };

    onChange([...data, newExp]);
  };

  const removeExp = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateChangeExp = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg text-base-content font-bold">
            Work Experience
          </h3>
          <p className="text-gray-500 text-sm">Add your work experience</p>
        </div>
        <button
          type="button"
          onClick={addExp}
          className="btn btn-primary btn-sm btn-outline"
        >
          <FaPlus size={12} />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 mt-5 text-base-content/50 border border-dashed border-base-300 rounded-box">
          <FaBriefcase size={28} />
          <p className="text-sm">No work experience added yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-5">
          {data.map((exp, index) => (
            <div
              key={exp._id || index}
              className="p-4 border border-base-300 rounded-box flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">
                  Experience #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeExp(index)}
                  className="btn btn-ghost btn-xs text-error"
                  aria-label="Remove experience"
                >
                  <FaTrash size={12} />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Company</label>
                  <input
                    type="text"
                    value={exp.company || ""}
                    onChange={(e) =>
                      updateChangeExp(index, "company", e.target.value)
                    }
                    placeholder="Company name"
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Position</label>
                  <input
                    type="text"
                    value={exp.potition || ""}
                    onChange={(e) =>
                      updateChangeExp(index, "potition", e.target.value)
                    }
                    placeholder="Job title"
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Start Date</label>
                  <input
                    type="month"
                    value={exp.startDate || ""}
                    onChange={(e) =>
                      updateChangeExp(index, "startDate", e.target.value)
                    }
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">End Date</label>
                  <input
                    type="month"
                    value={exp.isCurrent ? "" : exp.endDate || ""}
                    onChange={(e) =>
                      updateChangeExp(index, "endDate", e.target.value)
                    }
                    disabled={exp.isCurrent}
                    className="input w-full"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={exp.isCurrent || false}
                  onChange={(e) =>
                    updateChangeExp(index, "isCurrent", e.target.checked)
                  }
                  className="checkbox checkbox-primary checkbox-sm"
                />
                I currently work here
              </label>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  rows={4}
                  value={exp.description || ""}
                  onChange={(e) =>
                    updateChangeExp(index, "description", e.target.value)
                  }
                  placeholder={
                    "Describe your responsibilities\nDescribe your achievements"
                  }
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

export default ExperienceForm;

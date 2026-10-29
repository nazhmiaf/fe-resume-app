import { FaGraduationCap, FaPlus, FaTrash } from "react-icons/fa6";

const EducationForm = ({ data = [], onChange }) => {
  const addEdu = () => {
    const newEdu = {
      intituteName: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };

    onChange([...data, newEdu]);
  };

  const removeEdu = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateChangeEdu = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg text-base-content font-bold">Education</h3>
          <p className="text-gray-500 text-sm">Add your education history</p>
        </div>
        <button
          type="button"
          onClick={addEdu}
          className="btn btn-primary btn-sm btn-outline"
        >
          <FaPlus size={12} />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 mt-5 text-base-content/50 border border-dashed border-base-300 rounded-box">
          <FaGraduationCap size={28} />
          <p className="text-sm">No education added yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-5">
          {data.map((edu, index) => (
            <div
              key={edu._id || index}
              className="p-4 border border-base-300 rounded-box flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">
                  Education #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeEdu(index)}
                  className="btn btn-ghost btn-xs text-error"
                  aria-label="Remove education"
                >
                  <FaTrash size={12} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Institution</label>
                <input
                  type="text"
                  value={edu.intituteName || ""}
                  onChange={(e) =>
                    updateChangeEdu(index, "intituteName", e.target.value)
                  }
                  placeholder="Institution name"
                  className="input w-full"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Degree</label>
                  <input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) =>
                      updateChangeEdu(index, "degree", e.target.value)
                    }
                    placeholder="Degree"
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Field of Study</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ""}
                    onChange={(e) =>
                      updateChangeEdu(index, "fieldOfStudy", e.target.value)
                    }
                    placeholder="Field of study"
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Start Date</label>
                  <input
                    type="month"
                    value={edu.startDate || ""}
                    onChange={(e) =>
                      updateChangeEdu(index, "startDate", e.target.value)
                    }
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">End Date</label>
                  <input
                    type="month"
                    value={edu.endDate || ""}
                    onChange={(e) =>
                      updateChangeEdu(index, "endDate", e.target.value)
                    }
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">GPA</label>
                  <input
                    type="text"
                    value={edu.gpa || ""}
                    onChange={(e) =>
                      updateChangeEdu(index, "gpa", e.target.value)
                    }
                    placeholder="GPA"
                    className="input w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EducationForm;

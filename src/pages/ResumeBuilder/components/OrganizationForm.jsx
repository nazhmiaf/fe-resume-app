import { FaPeopleGroup, FaPlus, FaTrash } from "react-icons/fa6";

const OrganizationForm = ({ data = [], onChange }) => {
  const addOrg = () => {
    const newOrg = {
      organizationName: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    };

    onChange([...data, newOrg]);
  };

  const removeOrg = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateChangeOrg = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg text-base-content font-bold">
            Organizational Experience
          </h3>
          <p className="text-gray-500 text-sm">
            Add organizations you have been part of
          </p>
        </div>
        <button
          type="button"
          onClick={addOrg}
          className="btn btn-primary btn-sm btn-outline"
        >
          <FaPlus size={12} />
          Add Organization
        </button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 mt-5 text-base-content/50 border border-dashed border-base-300 rounded-box">
          <FaPeopleGroup size={28} />
          <p className="text-sm">No organization added yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-5">
          {data.map((org, index) => (
            <div
              key={org._id || index}
              className="p-4 border border-base-300 rounded-box flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">
                  Organization #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeOrg(index)}
                  className="btn btn-ghost btn-xs text-error"
                  aria-label="Remove organization"
                >
                  <FaTrash size={12} />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Organization</label>
                  <input
                    type="text"
                    value={org.organizationName || ""}
                    onChange={(e) =>
                      updateChangeOrg(index, "organizationName", e.target.value)
                    }
                    placeholder="Organization name"
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Position</label>
                  <input
                    type="text"
                    value={org.position || ""}
                    onChange={(e) =>
                      updateChangeOrg(index, "position", e.target.value)
                    }
                    placeholder="Role or position"
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Start Date</label>
                  <input
                    type="month"
                    value={org.startDate || ""}
                    onChange={(e) =>
                      updateChangeOrg(index, "startDate", e.target.value)
                    }
                    className="input w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">End Date</label>
                  <input
                    type="month"
                    value={org.isCurrent ? "" : org.endDate || ""}
                    onChange={(e) =>
                      updateChangeOrg(index, "endDate", e.target.value)
                    }
                    disabled={org.isCurrent}
                    className="input w-full"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={org.isCurrent || false}
                  onChange={(e) =>
                    updateChangeOrg(index, "isCurrent", e.target.checked)
                  }
                  className="checkbox checkbox-primary checkbox-sm"
                />
                I am currently active here
              </label>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  rows={4}
                  value={org.description || ""}
                  onChange={(e) =>
                    updateChangeOrg(index, "description", e.target.value)
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

export default OrganizationForm;

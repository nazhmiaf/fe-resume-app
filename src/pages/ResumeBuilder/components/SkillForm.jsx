import { useState } from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";

const SkillForm = ({ data = [], onChange }) => {
  const [input, setInput] = useState("");

  // bisa sekaligus banyak skill dipisah koma, yang sudah ada (case-insensitive) di-skip
  const addSkills = (raw) => {
    const existing = data.map((skill) => skill.toLowerCase());
    const newSkills = raw
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill, i, arr) => {
        const lower = skill.toLowerCase();
        return (
          skill &&
          !existing.includes(lower) &&
          arr.findIndex((s) => s.toLowerCase() === lower) === i
        );
      });

    if (newSkills.length > 0) onChange([...data, ...newSkills]);
    setInput("");
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      // Enter jangan sampai submit form resume
      e.preventDefault();
      addSkills(input);
    } else if (e.key === "Backspace" && !input && data.length > 0) {
      removeSkill(data.length - 1);
    }
  };

  return (
    <>
      <h3 className="text-lg text-base-content font-bold">Skills</h3>
      <p className="text-gray-500 text-sm">
        Add skills relevant to the job you are applying for
      </p>

      <div className="flex gap-2 mt-5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input.trim() && addSkills(input)}
          placeholder="Type a skill and press Enter"
          className="input w-full"
        />
        <button
          type="button"
          onClick={() => addSkills(input)}
          disabled={!input.trim()}
          className="btn btn-primary btn-outline"
        >
          <FaPlus size={12} />
          Add
        </button>
      </div>
      <p className="text-xs text-base-content/50 mt-1">
        Separate with commas to add several at once
      </p>

      {data.length === 0 ? (
        <p className="text-sm text-base-content/50 text-center py-8 mt-4 border border-dashed border-base-300 rounded-box">
          No skills added yet
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 mt-4">
          {data.map((skill, index) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 pl-3 pr-1 py-1 rounded-full bg-primary/10 text-primary text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="p-1 rounded-full hover:bg-primary/20 cursor-pointer"
                aria-label={`Remove ${skill}`}
              >
                <FaXmark size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default SkillForm;

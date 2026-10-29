import { FaCheck, FaChevronDown, FaGlobe, FaLock } from "react-icons/fa6";

const TEMPLATES = [
  { value: "classic", label: "Classic", description: "Simple and formal layout" },
  { value: "modern", label: "Modern", description: "Clean layout with accent header" },
];

// input type="color" cuma terima hex, jadi nama warna (mis. "darkblue") dikonversi dulu
const toHex = (color) => {
  if (/^#[0-9a-f]{6}$/i.test(color)) return color;
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = color || "#000000";
  return ctx.fillStyle;
};

const VISIBILITY_OPTIONS = [
  {
    value: false,
    label: "Private",
    description: "Only you can see this resume",
    icon: FaLock,
  },
  {
    value: true,
    label: "Public",
    description: "Anyone with the link can view it",
    icon: FaGlobe,
  },
];

const SettingForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleTemplate = (value) => {
    handleChange("template", value);
    // dropdown daisyUI terbuka karena focus, blur supaya langsung tertutup
    document.activeElement?.blur();
  };

  const activeTemplate =
    TEMPLATES.find((item) => item.value === data.template) ?? TEMPLATES[0];
  const accentHex = toHex(data.accentColor);

  return (
    <>
      <h3 className="text-lg text-base-content font-bold">Resume Settings</h3>
      <p className="text-gray-500 text-sm">
        Customize the title, look and visibility of your resume
      </p>

      <div className="flex flex-col gap-6 mt-5">
        {/* title / filename */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Resume Title</legend>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Frontend Developer Resume"
            className="input w-full"
          />
        </fieldset>

        {/* template */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Template</legend>
          <div className="dropdown w-full">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline border-base-300 w-full justify-between font-normal"
            >
              {activeTemplate.label}
              <FaChevronDown size={12} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box border border-base-300 shadow-sm z-10 w-full p-2 mt-1"
            >
              {TEMPLATES.map((item) => (
                <li key={item.value}>
                  <button
                    type="button"
                    onClick={() => handleTemplate(item.value)}
                    className={`flex justify-between ${
                      item.value === activeTemplate.value ? "menu-active" : ""
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs opacity-60">{item.description}</p>
                    </div>
                    {item.value === activeTemplate.value && <FaCheck size={12} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </fieldset>

        {/* accent color */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Accent Color</legend>
          <label className="input w-full cursor-pointer">
            <input
              type="color"
              value={accentHex}
              onChange={(e) => handleChange("accentColor", e.target.value)}
              className="size-6 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0"
            />
            <span className="font-mono uppercase">{accentHex}</span>
          </label>
          <p className="label">Click to pick a color for headings and lines</p>
        </fieldset>

        {/* visibility */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Visibility</legend>
          <div className="grid sm:grid-cols-2 gap-3">
            {VISIBILITY_OPTIONS.map((option) => {
              const isActive = Boolean(data.public) === option.value;
              const Icon = option.icon;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleChange("public", option.value)}
                  className={`flex items-start gap-3 p-4 rounded-box border text-left cursor-pointer transition-colors duration-300 ${
                    isActive
                      ? "border-primary bg-primary/5"
                      : "border-base-300 hover:border-base-content/30"
                  }`}
                >
                  <Icon
                    className={`mt-0.5 ${isActive ? "text-primary" : "text-base-content/50"}`}
                  />
                  <div>
                    <p className="font-medium text-sm">{option.label}</p>
                    <p className="text-xs text-base-content/50">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default SettingForm;

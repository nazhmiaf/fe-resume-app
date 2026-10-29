import {
  FaBriefcase,
  FaEnvelope,
  FaGlobe,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaUser,
} from "react-icons/fa6";

const fields = [
  { key: "fullname", label: "Full Name", icon: FaUser, type: "text", placeholder: "John Doe", required: true },
  { key: "jobtitle", label: "Job Title", icon: FaBriefcase, type: "text", placeholder: "Frontend Developer" },
  { key: "email", label: "Email", icon: FaEnvelope, type: "email", placeholder: "john@example.com", required: true },
  { key: "phone", label: "Phone", icon: FaPhone, type: "tel", placeholder: "+62 812 3456 7890" },
  { key: "address", label: "Address", icon: FaLocationDot, type: "text", placeholder: "Jakarta, Indonesia" },
  { key: "linkedinUrl", label: "LinkedIn", icon: FaLinkedin, type: "url", placeholder: "https://linkedin.com/in/johndoe" },
  { key: "portofolioUrl", label: "Portfolio", icon: FaGlobe, type: "url", placeholder: "https://johndoe.dev" },
];

const PersonalinfoForm = ({ data, onChance, removeBg, setRemoveBg }) => {
  const handleChance = (field, value) => {
    onChance({ ...data, [field]: value });
  };
  return (
    <>
      <h3 className="text-lg text-base-content font-bold">Personal Info</h3>
      <p className="text-gray-500 text-sm">
        Get started with personal information
      </p>
      <div className="flex items-center gap-4 mt-5">
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover ring-offset-2 ring-offset-base-100 hover:opacity-80 transition-opacity duration-300"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-base-content hover:text-base-content/60 transition-colors duration-300">
              <FaUser size={24} className="p-1 border rounded-full" />
              <p className="text-sm">Upload image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) => handleChance("image", e.target.files[0])}
          />
        </label>
        {data.image && typeof data.image === "object" && (
          <label className="flex items-center gap-2 text-sm text-base-content cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setRemoveBg((prev) => !prev)}
              checked={removeBg}
              className="toggle toggle-primary toggle-sm"
            />
            <span>Remove Background</span>
          </label>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {fields.map(({ key, label, icon: Icon, type, placeholder, required }) => (
          <div key={key} className="flex flex-col gap-1">
            <label
              htmlFor={key}
              className="flex items-center gap-2 text-sm font-medium text-base-content"
            >
              <Icon size={14} className="text-base-content/60" />
              {label}
              {required && <span className="text-error">*</span>}
            </label>
            <input
              id={key}
              type={type}
              placeholder={placeholder}
              required={required}
              value={data[key] || ""}
              onChange={(e) => handleChance(key, e.target.value)}
              className="input w-full"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PersonalinfoForm;

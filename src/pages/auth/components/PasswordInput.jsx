import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const PasswordInput = ({
  id,
  value,
  onChange,
  error,
  autoComplete = "current-password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className={`input w-full ${error ? "input-error" : ""}`}>
      <FaLock className="text-base-content/40" />
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder="Enter your password"
        autoComplete={autoComplete}
        className="focus:border-none focus:ring-slate-700"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="text-base-content/40 hover:text-base-content cursor-pointer"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </label>
  );
};

export default PasswordInput;

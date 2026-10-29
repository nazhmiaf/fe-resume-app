import { useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import { login, register } from "../../../../services/authService";
import { useAuthstore } from "../../../../store/authStore";
import PasswordInput from "../../components/PasswordInput";

// Mongoose error: "user validation failed: name: Name is required!, email: Email is required!"
const parseValidationMessage = (message) => {
  const errors = {};
  const details = message.split("validation failed: ")[1];
  if (!details) return errors;

  details.split(", ").forEach((item) => {
    const [field, ...rest] = item.split(": ");
    if (field && rest.length) errors[field] ??= rest.join(": ");
  });

  return errors;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const setUserData = useAuthstore((state) => state.setUserData);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    try {
      await register({ name, email, password });

      // register tidak mengembalikan token, jadi login untuk mendapatkannya
      const res = await login({ email, password });

      setUserData(res.data);
      navigate("/app");
    } catch (err) {
      const message = err.response?.data?.message;
      const errors =
        typeof message === "string" ? parseValidationMessage(message) : {};

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
      } else {
        setError(message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} noValidate className="flex flex-col gap-4">
      {error && <div className="text-error text-sm">{error}</div>}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <label className={`input w-full ${fieldErrors.name ? "input-error" : ""}`}>
          <FaUser className="text-base-content/40" />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            autoComplete="name"
            className="focus:border-none focus:ring-slate-700"
          />
        </label>
        {fieldErrors.name && (
          <p className="mt-1.5 text-sm text-error">{fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <label className={`input w-full ${fieldErrors.email ? "input-error" : ""}`}>
          <FaEnvelope className="text-base-content/40" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="focus:border-none focus:ring-slate-700"
          />
        </label>
        {fieldErrors.email && (
          <p className="mt-1.5 text-sm text-error">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Password
        </label>
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          autoComplete="new-password"
        />
        {fieldErrors.password && (
          <p className="mt-1.5 text-sm text-error">{fieldErrors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full mt-2"
      >
        {loading && <span className="loading loading-spinner loading-sm" />}
        {loading ? "Creating account..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;

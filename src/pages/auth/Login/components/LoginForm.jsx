import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router";
import { login } from "../../../../services/authService";
import { useAuthstore } from "../../../../store/authStore";
import PasswordInput from "../../components/PasswordInput";

const LoginForm = () => {
  const navigate = useNavigate();
  const setUserData = useAuthstore((state) => state.setUserData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await login({ email, password });

      setUserData(res.data);
      navigate("/app");
    } catch (err) {
      const message = err.response?.data?.message;

      if (Array.isArray(message)) {
        const errors = {};
        message.forEach((msg) => {
          if (msg.toLowerCase().startsWith("email")) errors.email ??= msg;
          else if (msg.toLowerCase().startsWith("password")) errors.password ??= msg;
        });
        setFieldErrors(errors);
      } else {
        setError(message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} noValidate className="flex flex-col gap-4">
      {error && (
        <div className="text-error text-sm">
          {error}
        </div>
      )}

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
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;

import { Link, Navigate } from "react-router";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "./components/LoginForm";
import { useAuthstore } from "../../../store/authStore";


const LoginPage = () => {
  const {isAuthentication} = useAuthstore()
  return !isAuthentication ? (
    <AuthLayout
      title="Login"
      description="Welcome back. Sign in to continue building your resume."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Register
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  ) : (
    <Navigate to={'/app'} replace/>
  );
};

export default LoginPage;

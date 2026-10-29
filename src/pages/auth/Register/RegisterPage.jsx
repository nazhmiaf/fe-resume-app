import { Link } from "react-router";
import AuthLayout from "../components/AuthLayout";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Register"
      description="Create an account to start building your resume."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;

import { Navigate } from "react-router";
import { useAuthstore } from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const isAuthentication = useAuthstore((state) => state.isAuthentication);

  if (!isAuthentication) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

import { Route, Routes } from "react-router";
import HomePage from "./pages/Home/HomePage";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ResumeBuilderPage from "./pages/ResumeBuilder/ResumeBuilderPage";
import LoginPage from "./pages/auth/Login/LoginPage";
import RegisterPage from "./pages/auth/Register/RegisterPage";
import PreviewPage from "./pages/Preview/PreviewPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="app"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="builder/:resumeId" element={<ResumeBuilderPage />} />
      </Route>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/view/:resumeId" element={<PreviewPage/>} />
      {/* semua URL yang tidak cocok dengan route di atas */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

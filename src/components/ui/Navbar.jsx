import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { useAuthstore } from "../../store/authStore";
import { logout } from "../../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, removeUserData } = useAuthstore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
      removeUserData();
    }
  };

  return (
    <nav className="print:hidden sticky top-0 z-100 flex items-center justify-between px-6 md:px-10 lg:px-16 xl:px-20 py-4 border-b border-base-300 bg-base-100 text-base-content">
      <Link to="/app" className="flex items-center gap-2">
        <svg
          width="31"
          height="40"
          viewBox="0 6 31 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
        >
          <path
            d="M8.75 11.2991L15.5 15.1839L22.25 11.2991M8.75 34.5783V26.8236L2 22.9387M29 22.9387L22.25 26.8236V34.5783M2.405 15.4081L15.5 22.9536L28.595 15.4081M15.5 38V22.9387M29 28.9154V16.962C28.9995 16.4379 28.8606 15.9233 28.5973 15.4696C28.334 15.0159 27.9556 14.6391 27.5 14.3771L17 8.40036C16.5439 8.13808 16.0266 8 15.5 8C14.9734 8 14.4561 8.13808 14 8.40036L3.5 14.3771C3.04439 14.6391 2.66597 15.0159 2.40269 15.4696C2.13941 15.9233 2.00054 16.4379 2 16.962V28.9154C2.00054 29.4395 2.13941 29.9541 2.40269 30.4078C2.66597 30.8615 3.04439 31.2383 3.5 31.5003L14 37.477C14.4561 37.7393 14.9734 37.8774 15.5 37.8774C16.0266 37.8774 16.5439 37.7393 17 37.477L27.5 31.5003C27.9556 31.2383 28.334 30.8615 28.5973 30.4078C28.8606 29.9541 28.9995 29.4395 29 28.9154Z"
            className="stroke-primary"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xl font-semibold">ResumeApp</span>
      </Link>

      <div className="flex items-center gap-4">
        <p className="max-sm:hidden text-sm">
          Hi, <span className="font-semibold capitalize">{user?.name}</span>
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-outline cursor-pointer transition-all duration-300 btn-primary rounded-full px-6"
        >
          <LuLogOut className="size-4" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import ThemeToggleButton from "./ThemeToggleButton";
import Profile from "./Profile";
import { FiMenu, FiX } from "react-icons/fi";
import { HoverBorderGradient } from "../ui/HoverBorderGradient";
import { Link } from "react-router-dom";

const MainNavBtn = ({ currentUser, setIsMobileMenuOpen, isMobileMenuOpen }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-4">
        <ThemeToggleButton />
        {currentUser ? (
          <Profile currentUser={currentUser} />
        ) : (
          <HoverBorderGradient className={"py-1.5 px-5 bg-blue-500 rounded-xl"}>
            <Link to="/sign-in">ورود</Link>
          </HoverBorderGradient>
        )}
      </div>
      <div className="md:hidden">
        <button
          className="dark:text-white text-gray-900 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </div>
  );
};

export default MainNavBtn;

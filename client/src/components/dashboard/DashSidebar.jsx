import { Link } from "react-router-dom";
import Logo from "../main/Logo";
import NavLinks from "./sidebar/NavLinks";
import UserProfile from "./sidebar/UserProfile";

const DashSidebar = () => {
  return (
    <div className="md:flex md:flex-col h-full w-full bg-white text-zinc-900 dark:bg-slate-800 dark:text-white">
      <div className="flex items-center justify-center border-b border-gray-300 dark:border-gray-600">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="md:flex md:flex-col md:justify-between md:h-full">
        <NavLinks />
        <UserProfile />
      </div>
    </div>
  );
};

export default DashSidebar;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/category/categorySlice";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import MainNavLinks from "./MainNavLinks";
import MainNavBtn from "./MainNavBtn";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { categories } = useSelector((state) => state.category);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const getLinkClasses = (path) => {
    const baseClasses = "hover:text-blue-500 transition-colors";
    return location.pathname === path
      ? `${baseClasses} text-blue-500`
      : baseClasses;
  };

  return (
    <nav className="px-4 md:px-8 fixed top-0 left-0 w-full h-20 bg-slate-200 dark:bg-slate-900 shadow-md z-50">
      <div className="flex items-center justify-between h-full container mx-auto">
        <Link to={"/"} className="flex items-center">
          <Logo />
        </Link>

        <MainNavLinks categories={categories} getLinkClasses={getLinkClasses} />

        <MainNavBtn
          currentUser={currentUser}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <MobileNav
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          getLinkClasses={getLinkClasses}
          categories={categories}
          currentUser={currentUser}
        />
      </div>
    </nav>
  );
};

export default Navbar;

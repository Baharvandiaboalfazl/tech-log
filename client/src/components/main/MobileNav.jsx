import { Link } from "react-router-dom";
import { HoverBorderGradient } from "../ui/HoverBorderGradient";
import Accordion from "../Accordion";
import ThemeToggleButton from "./ThemeToggleButton";
import Profile from "./Profile";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const MobileNav = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  getLinkClasses,
  categories,
  currentUser,
}) => {
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setIsMobileMenuOpen(false));

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          ref={menuRef}
          className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-800 shadow-lg p-4"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ul className="flex flex-col items-center gap-4 font-semibold text-gray-700 dark:text-white">
            <li>
              <Link to="/" className={getLinkClasses("/")}>
                صفحه اصلی
              </Link>
            </li>
            <Accordion
              className="relative overflow-hidden"
              title={"دسته‌بندی‌ها"}
            >
              {categories.map((category) => (
                <Link
                  to={`/categories/${category.slug}`}
                  key={category._id}
                  className="w-full flex justify-between items-center px-4 py-2 text-sm  text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-md"
                >
                  {category.name}
                </Link>
              ))}
            </Accordion>
            <li>
              <Link to="/articles" className={getLinkClasses("/articles")}>
                مقاله‌ها
              </Link>
            </li>
            <li>
              <Link to="/about" className={getLinkClasses("/about")}>
                درباره من
              </Link>
            </li>
          </ul>
          <div className="flex justify-center gap-4 mt-6 pt-6 border-t dark:border-slate-700">
            <ThemeToggleButton />
            {currentUser ? (
              <Profile currentUser={currentUser} />
            ) : (
              <HoverBorderGradient
                className={"py-1.5 px-5 bg-blue-500 rounded-xl"}
              >
                <Link to="/sign-in">ورود</Link>
              </HoverBorderGradient>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;

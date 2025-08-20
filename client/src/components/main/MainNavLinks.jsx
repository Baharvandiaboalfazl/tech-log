import { useState } from "react";
import { Menu, MenuItem } from "../ui/NavbarMenu";
import { Link } from "react-router-dom";

const MainNavLinks = ({ categories, getLinkClasses }) => {
  const [active, setActive] = useState(null);

  return (
    <div className="hidden md:flex items-center gap-6">
      <ul className="flex items-center gap-6 font-semibold text-gray-700 dark:text-white">
        <li>
          <Link to="/" className={getLinkClasses("/")}>
            صفحه اصلی
          </Link>
        </li>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="دسته‌بندی‌ها">
            <div className="flex flex-col space-y-4 text-sm">
              {categories.map((category) => (
                <Link
                  to={`/categories?cat=${category.slug}`}
                  key={category._id}
                  className="w-full flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-white hover:bg-blue-500 rounded-md"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </MenuItem>
        </Menu>
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
    </div>
  );
};

export default MainNavLinks;

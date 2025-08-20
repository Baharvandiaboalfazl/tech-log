import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment-jalaali";
import { FaGithub, FaTelegram, FaInstagram, FaRegCopy } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/category/categorySlice";
import ScrollToTop from "../ScrollToTop";
import Logo from "./Logo";

const Footer = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories({ limit: 6 }));
  }, [dispatch]);

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    toast.success("ایمیل با موفقیت کپی شد!");
  };

  return (
    <footer className="relative pt-20 bg-slate-200 dark:bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-5">
        <div className="flex flex-col md:flex-row text-center md:text-right md:items-start items-center justify-between gap-10 md:gap-8 pb-8 mb-8 border-b border-gray-800">
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <Link to="/" className="flex mb-4">
              <Logo />
            </Link>
            <p className="text-gray-900 dark:text-gray-400 leading-relaxed mb-6">
              وبلاگ تخصصی برنامه‌نویسی و تکنولوژی. جدیدترین مقالات و آموزش‌ها را
              اینجا بخوانید.
            </p>
            <div className="flex gap-4">
              <Link
                to="https://github.com/Baharvandiaboalfazl"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-stone-800 transition-all duration-300 hover:scale-110 active:scale-90 rounded-full"
              >
                <FaGithub size={24} />
              </Link>
              <Link
                to="https://t.me/aboallfazlll"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-blue-600 transition-all duration-300 hover:scale-110 active:scale-90 rounded-full"
              >
                <FaTelegram size={24} />
              </Link>
              <Link
                to="/no-instagram"
                target="_blank"
                className="p-2 bg-stone-900 hover:bg-pink-700 transition-all duration-300 hover:scale-110 active:scale-90 rounded-full"
              >
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">
              صفحات اصلی
            </h3>
            <ul className="space-y-3 text-gray-800 dark:text-gray-400">
              <li>
                <Link
                  to="/"
                  target="_blank"
                  className="hover:text-gray-400 transition-colors hover:underline"
                >
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  to="/articles"
                  target="_blank"
                  className="hover:text-gray-400 transition-colors hover:underline"
                >
                  مقاله ها
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  target="_blank"
                  className="hover:text-gray-400 transition-colors hover:underline"
                >
                  دسته‌بندی‌ها
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  target="_blank"
                  className="hover:text-gray-400 transition-colors hover:underline"
                >
                  درباره من
                </Link>
              </li>
            </ul>
          </div>

          <div className=" w-full md:w-auto">
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">
              دسته‌بندی‌ها
            </h3>
            {categories && categories.length > 0 ? (
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-gray-800 dark:text-gray-400">
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/categories?cat=${category.slug}`}
                      className="hover:text-gray-400 transition-colors hover:underline"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">درحال بارگذاری...</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-center text-gray-900 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <span>&copy;</span>
            <p>{moment().format("YYYY")}</p>
            <p>تمامی حقوق برای وبسایت تک لاگ محفوظ است.</p>
          </div>
          <div>
            <button
              onClick={() => handleCopy("baharvandiaboalfazl@gmail.com")}
              className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-400 hover:text-gray-500 text-sm transition-colors"
            >
              <FaRegCopy />
              baharvandiaboalfazl@gmail.com
            </button>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
};

export default Footer;

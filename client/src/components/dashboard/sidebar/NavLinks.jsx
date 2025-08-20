import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setTab } from "../../../redux/dashboard/dashboardSlice";
import {
  HiUser,
  HiDocumentText,
  HiOutlineAnnotation,
  HiChartPie,
  HiTag,
  HiOutlineUserGroup,
  HiOutlineCog,
} from "react-icons/hi";
import Accordion from "../../Accordion";

const NavLinks = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { tab } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      dispatch(setTab(tabFromUrl));
    }
  }, [location.search, dispatch]);

  const activeTab = (linkTab) => {
    const baseClasses =
      "flex items-center gap-3 w-full px-5 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors";
    return tab === linkTab
      ? `${baseClasses} bg-blue-600 text-white`
      : baseClasses;
  };

  return (
    <ul className="flex flex-col gap-2 my-5 md:px-4 text-md">
      {currentUser.role === "admin" && (
        <Link to="/dashboard?tab=dash">
          <li className={activeTab("dash")}>
            <HiChartPie size={20} /> داشبورد
          </li>
        </Link>
      )}
      <Link to="/dashboard?tab=profile">
        <li className={activeTab("profile")}>
          <HiUser size={20} /> پروفایل
        </li>
      </Link>
      {(currentUser.role === "admin" || currentUser.role === "editor") && (
        <Accordion title={"دسته‌بندی‌ها"}>
          <Link to="/dashboard?tab=posts">
            <li className={activeTab("posts")}>
              <HiDocumentText size={20} /> مقاله ها
            </li>
          </Link>
          <Link to="/dashboard?tab=comments">
            <li className={activeTab("comments")}>
              <HiOutlineAnnotation size={20} /> دیدگاه‌ها
            </li>
          </Link>
          {currentUser.role === "admin" && (
            <Link to="/dashboard?tab=users">
              <li className={activeTab("users")}>
                <HiOutlineUserGroup size={20} /> کاربران
              </li>
            </Link>
          )}
        </Accordion>
      )}
      {currentUser.role === "admin" && (
        <>
          <Link to="/dashboard?tab=categories">
            <li className={activeTab("categories")}>
              <HiTag size={20} /> دسته‌بندی‌ها
            </li>
          </Link>
          <Link to="/dashboard?tab=settings">
            <li className={activeTab("settings")}>
              <HiOutlineCog size={20} />
              تنظیمات
            </li>
          </Link>
        </>
      )}
    </ul>
  );
};

export default NavLinks;

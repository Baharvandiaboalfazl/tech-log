import { useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signoutUser } from "../../redux/user/userSlice";
import CreatePostModal from "../modals/CreatePostModal";
import { useSelector } from "react-redux";
import Tooltip from "../Tooltip";

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handlePostCreated = () => {
    setIsModalOpen(false);
  };

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSignOut = async () => {
    dispatch(signoutUser()).unwrap();

    toast.success("با موفقیت از حساب خود خارج شدید.");
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-3 bg-white dark:bg-slate-800 rounded-md shadow-xl z-10">
          <div className="flex flex-col max-w-64 px-3 pt-2 text-sm">
            <div className="flex gap-2">
              <span className="dark:text-white">نام کاربری:</span>
              <span className="text-gray-600 dark:text-gray-100">
                {currentUser.username}@
              </span>
            </div>
            <div className="flex gap-2 overflow-hidden">
              <span className="dark:text-white">ایمیل:</span>
              <Tooltip content={currentUser.email}>
                <span className="text-gray-600 dark:text-gray-100 cursor-pointer">
                  {currentUser.email}
                </span>
              </Tooltip>
            </div>
          </div>
          <div className="w-full border-b mt-2 border-gray-300 dark:border-gray-600"></div>
          <div className="flex flex-col gap-1 p-3">
            <Link
              to={"/dashboard?tab=profile"}
              className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white rounded-md"
            >
              پروفایل
            </Link>
            {(currentUser.role === "admin" ||
              currentUser.role === "editor") && (
              <Link
                to="/create-post"
                state={{ backgroundLocation: location }}
                className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white rounded-md"
                onClick={() => setIsModalOpen(true)}
              >
                پست جدید
              </Link>
            )}
            {currentUser.role === "admin" && (
              <Link
                to={"/dashboard?tab=dash"}
                className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white rounded-md"
              >
                داشبورد
              </Link>
            )}
            <Link
              to={"/"}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white rounded-md"
              onClick={handleSignOut}
            >
              خروج از حساب
            </Link>
          </div>

          <CreatePostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onPostCreated={handlePostCreated}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;

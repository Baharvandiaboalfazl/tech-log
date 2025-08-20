import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowSmRight } from "react-icons/hi";
import { signoutUser } from "../../../redux/user/userSlice";
import toast from "react-hot-toast";
import Tooltip from "../../Tooltip";

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signoutUser())
      .unwrap()
      .catch((err) => toast.error(err));

    toast.success("با موفقیت از حساب خود خارج شدید.");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-start py-4 md:px-4 border-t border-gray-300 dark:border-gray-600">
      <Link to="/dashboard?tab=profile">
        <div className="flex items-center justify-center gap-2 text-xs mb-5">
          <img src={currentUser.avatar} className="w-12 h-12" />
          <div className="flex flex-col overflow-hidden">
            <span>{currentUser.username}</span>
            <Tooltip content={currentUser.email}>
              <span>{currentUser.email}</span>
            </Tooltip>
          </div>
        </div>
      </Link>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 w-full px-5 py-3 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
      >
        <HiArrowSmRight size={20} />
        خروج از حساب
      </button>
    </div>
  );
};

export default UserProfile;

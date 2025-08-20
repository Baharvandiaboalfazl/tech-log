import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const useAuthStatus = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;

    const checkToken = async () => {
      try {
        await axios.get("/api/auth/check-auth");
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          toast.error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید.");
          dispatch(signoutSuccess());
        }
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [currentUser, dispatch]);
};

export default useAuthStatus;

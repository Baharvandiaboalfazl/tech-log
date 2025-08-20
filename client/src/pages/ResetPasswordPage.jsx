import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { LoaderTwo } from "../components/ui/Loaders";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading } = useSelector((state) => state.user);
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("رمزهای عبور یکسان نیستند.");
    }

    dispatch(resetPassword({ token, password }))
      .unwrap()
      .then(() => {
        setTimeout(() => navigate("/sign-in"), 2000);
        toast.success("رمز عبور شما با موفقیت تغییر کرد.");
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900"
      dir="rtl"
    >
      <div className="max-w-md w-full p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center dark:text-white mb-4">
          تغییر رمز عبور جدید
        </h2>
        <p className="text-center text-gray-500 mb-8">
          رمز عبور جدید خود را وارد کنید.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            placeholder="رمز عبور جدید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-14 px-4 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
          <input
            type="password"
            placeholder="تکرار رمز عبور جدید"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full h-14 px-4 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full h-14 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? <LoaderTwo /> : "ذخیره تغییرات"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

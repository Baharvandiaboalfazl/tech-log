import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { LoaderTwo } from "../components/ui/Loaders";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword({ email }))
      .unwrap()
      .then(toast.success("ایمیل بازیابی برای شما ارسال شد."))
      .catch((err) => {
        if (err.errors.email) {
          toast.error(err.errors.email);
        }
        if (email && !err.errors.email) {
          toast.error(err.errors.user);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="max-w-lg w-full p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold dark:text-white text-center mb-4">
          فراموشی رمز عبور
        </h2>
        <p className="text-center text-gray-500 mb-8">
          ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-4 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full h-14 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            {loading ? <LoaderTwo /> : "ارسال لینک"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

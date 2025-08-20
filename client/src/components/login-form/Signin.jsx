import { Link } from "react-router-dom";
import { LoaderTwo } from "../ui/Loaders";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = ({ handleSubmit, handleChange, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center lg:w-1/2 w-full h-screen bg-gray-50 dark:bg-slate-800">
      <div className="w-3/5 mx-auto">
        <p className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white">
          ورود به حساب کاربری
        </p>
        <p className="lg:text-xl mt-4 text-gray-600">
          حساب کاربری ندارید؟
          <Link
            to="/sign-up"
            className="text-blue-600 hover:underline font-semibold mr-1"
          >
            ثبت نام
          </Link>
        </p>

        <form className="flex flex-col mt-14" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              id="email"
              className="w-full h-14 rounded-lg pr-4 outline-none border border-gray-900 dark:border-gray-400 focus:ring-blue-500 dark:text-white"
              type="text"
              placeholder="ایمیل خود را وارد کنید"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                id="password"
                className="w-full h-14 rounded-lg pr-4 outline-none border border-gray-900 dark:border-gray-400 focus:ring-blue-500 dark:text-white"
                type={showPassword ? "text" : "password"}
                placeholder="پسوورد خود را وارد کنید"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute left-4 top-4 text-gray-400 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
              </button>
            </div>
          </div>

          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline mt-4"
          >
            فراموشی رمز عبور؟
          </Link>

          <button
            className="flex items-center justify-center w-full h-14 mt-6 text-xl lg:text-2xl font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-opacity disabled:opacity-70 hover:scale-105 active:scale-95"
            type="submit"
            disabled={loading}
          >
            {loading ? <LoaderTwo /> : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;

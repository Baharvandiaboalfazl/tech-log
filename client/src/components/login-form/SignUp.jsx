import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LoaderTwo } from "../ui/Loaders";
import { useState } from "react";

const Signup = ({ loading, handleSignupSubmit, handleChange, fieldErrors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center lg:w-1/2 h-screen bg-gray-50 dark:bg-slate-800">
      <div className="w-3/5 mx-auto">
        <div>
          <p className="text-3xl lg:text-4xl xl:text-5xl font-bold text-black dark:text-white">
            ساخت حساب کاربری
          </p>
          <p className="lg:text-xl mt-2 text-gray-300 dark:text-gray-400">
            قبلا ثبت نام کرده اید؟
            <Link
              to="/sign-in"
              className="text-blue-600 hover:underline font-semibold mr-1"
            >
              ورود
            </Link>
          </p>
          <form className="flex flex-col mt-14" onSubmit={handleSignupSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <input
                  id="username"
                  type="text"
                  placeholder="نام کاربری"
                  onChange={handleChange}
                  className="w-full h-14 rounded-lg pr-4 outline-none border border-gray-900 dark:border-gray-400 focus:ring-blue-500 dark:text-white"
                />
                {fieldErrors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.username}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="email"
                  type="text"
                  placeholder="ایمیل"
                  onChange={handleChange}
                  className="w-full h-14 rounded-lg pr-4 outline-none border border-gray-900 dark:border-gray-400 focus:ring-blue-500 dark:text-white"
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور"
                  onChange={handleChange}
                  className="w-full h-14 rounded-lg pr-4 outline-none border border-gray-900 dark:border-gray-400 focus:ring-blue-500 dark:text-white"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute left-4 top-4 text-gray-400 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash size={25} />
                  ) : (
                    <FaEye size={25} />
                  )}
                </button>
                {fieldErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full h-14 mt-6 text-xl lg:text-2xl font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-opacity disabled:opacity-70 hover:scale-105 active:scale-95"
            >
              {loading ? <LoaderTwo /> : "ادامه"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import { LoaderTwo } from "../ui/Loaders";

const VerifyEmail = ({
  formData,
  handleVerifySubmit,
  handleChange,
  handleResendOtp,
  otpError,
  loading,
  cooldown,
}) => {
  return (
    <div className="flex items-center justify-center lg:w-1/2 h-screen bg-gray-50 dark:bg-slate-800">
      <div className="w-3/5 mx-auto">
        <p className="text-4xl font-bold text-gray-800 text-center">
          تأیید ایمیل
        </p>
        <p className="text-lg mt-2 text-gray-600 dark:text-white text-center">
          کد ۶ رقمی ارسال شده به
          <span className="px-1 font-semibold dark:text-zinc-500">
            {formData.email}
          </span>
          را وارد کنید.
        </p>
        <p className="text-sm mt-2 text-gray-400 font-semibold text-center">
          در صورت پیدا نشدن ایمیل پوشه اسپم رو چک کنید.
        </p>
        <form className="flex flex-col mt-10" onSubmit={handleVerifySubmit}>
          <div className="flex flex-col gap-4">
            <input
              id="otp"
              type="text"
              placeholder="------"
              onChange={handleChange}
              required
              maxLength={6}
              className="w-full h-14 text-center border dark:border-gray-400 dark:text-white rounded-md outline-none"
            />
            {otpError && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {otpError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center h-14 mt-8 text-xl font-bold text-white bg-blue-500 hover:scale-105 active:scale-95 rounded-lg"
          >
            {loading ? <LoaderTwo /> : "تأیید و ثبت نام"}
          </button>
          <div className="text-center mt-4 text-sm">
            {cooldown > 0 ? (
              <p className="text-gray-500">
                لطفاً {cooldown} ثانیه دیگر صبر کنید.
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                ارسال مجدد کد
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setStep(1);
              dispatch(clearError());
            }}
            className="text-sm text-center w-full mt-4 text-gray-300 hover:underline cursor-pointer"
          >
            بازگشت به مرحله قبل
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;

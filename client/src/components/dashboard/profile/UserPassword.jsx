const UserPassword = ({ handleChange, formErrors }) => {
  return (
    <div className="w-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold dark:text-white">امنیت</h2>
      <div className="w-full border-b my-5 border-gray-300 dark:border-gray-600"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          id="currentPassword"
          type="password"
          placeholder="رمز عبور فعلی"
          onChange={handleChange}
          className="w-full h-10 p-2 border rounded-md dark:text-gray-300"
        />
        <input
          id="newPassword"
          type="password"
          placeholder="رمز عبور جدید"
          onChange={handleChange}
          className="w-full h-10 p-2 border rounded-md dark:text-gray-300"
        />
        <input
          id="confirmPassword"
          type="password"
          placeholder="تکرار رمز جدید"
          onChange={handleChange}
          className="w-full h-10 p-2 border rounded-md dark:text-gray-300"
        />
      </div>
      {formErrors.password && (
        <p className="text-red-500 text-sm mt-2">{formErrors.password}</p>
      )}
    </div>
  );
};

export default UserPassword;

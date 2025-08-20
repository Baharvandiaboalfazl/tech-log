const UserSocials = ({ currentUser, formData, handleSocialChange }) => {
  return (
    <>
      {(currentUser.role === "admin" || currentUser.role === "editor") && (
        <div className="w-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold dark:text-white">
            شبکه‌های اجتماعی
          </h2>
          <div className="w-full border-b my-5 border-gray-300 dark:border-gray-600"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 dark:text-gray-100">توییتر</label>
              <input
                id="twitter"
                type="text"
                value={formData.socials?.twitter || ""}
                onChange={handleSocialChange}
                placeholder="لینک پروفایل توییتر"
                className="w-full h-10 p-2 border rounded-md dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block mb-1 dark:text-gray-100">
                اینستاگرام
              </label>
              <input
                id="instagram"
                type="text"
                value={formData.socials?.instagram || ""}
                onChange={handleSocialChange}
                placeholder="لینک پروفایل اینستاگرام"
                className="w-full h-10 p-2 border rounded-md dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block mb-1 dark:text-gray-100">تلگرام</label>
              <input
                id="telegram"
                type="text"
                value={formData.socials?.telegram || ""}
                onChange={handleSocialChange}
                placeholder="آی‌دی یا لینک تلگرام"
                className="w-full h-10 p-2 border rounded-md dark:text-gray-300"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSocials;

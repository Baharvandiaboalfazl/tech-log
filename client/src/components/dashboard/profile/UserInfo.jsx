import ClickAnimation from "../../ClickAnimation";
import ProfilePicture from "./ProfilePicture";

const UserInfo = ({
  currentUser,
  formData,
  handleChange,
  formErrors,
  imgUploader,
}) => {
  return (
    <div className="w-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        اطلاعات کاربری
      </h2>
      <div className="w-full my-5 border-b border-gray-300 dark:border-gray-600"></div>
      <div className="grid grid-cols-3 gap-8 items-center">
        <div className="col-span-1 grid grid-rows-5 h-full gap-2">
          <p className="row-span-1 dark:text-white text-center">
            برای تغییر عکس پروفایل روی پروفایل کلیک کنید.
          </p>
          <div className="flex justify-center items-end row-span-3">
            <ProfilePicture
              currentUser={currentUser}
              imgUploader={imgUploader}
            />
          </div>
          <div className="flex justify-center row-span-1">
            <ClickAnimation />
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 dark:text-gray-100">
                نام کاربری
              </label>
              <input
                id="username"
                type="text"
                value={formData.username || ""}
                onChange={handleChange}
                className="w-full h-10 p-2 border rounded-md dark:text-gray-300 outline-blue-500 transition-colors"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.username}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block mb-1 dark:text-gray-100">ایمیل</label>
              <input
                id="email"
                type="email"
                value={formData.email || ""}
                disabled
                className="w-full h-10 p-2 border rounded-md bg-gray-100 dark:bg-slate-500 "
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-1 dark:text-gray-100">بیوگرافی</label>
            <textarea
              id="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              maxLength={200}
              className="w-full h-28 p-2 border rounded-md dark:text-gray-300"
            />
            {formErrors.bio && (
              <p className="text-red-500 text-sm mt-1">{formErrors.bio}</p>
            )}
            <p className="text-gray-500 text-xs">
              {200 - (formData.bio || "").length} کاراکتر باقی مانده
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

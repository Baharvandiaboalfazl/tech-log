import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";
import { useTheme } from "../../contexts/ThemeContext";
import toast from "react-hot-toast";

const DashSettings = () => {
  const dispatch = useDispatch();
  const { settings: globalSettings, loading } = useSelector(
    (state) => state.settings
  );
  const { theme, setTheme } = useTheme();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (globalSettings) {
      setFormData(globalSettings);
    }
  }, [globalSettings]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSettings(formData)).then(
      toast.success("تنظیمات با موفقیت آپدیت شد.")
    );
  };

  return (
    <div className="px-4 py-10 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl dark:text-white font-bold mb-6">تنظیمات سایت</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-8"
      >
        <div>
          <h2 className="text-xl dark:text-white font-semibold mb-4">
            تنظیمات ظاهری
          </h2>
          <div className="flex flex-col">
            <label
              htmlFor="themeSelector"
              className="mb-2 dark:text-gray-400 font-medium"
            >
              تم پیش‌فرض سایت
            </label>
            <select
              id="themeSelector"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="p-2 dark:bg-slate-700 border text-gray-700 border-gray-700 dark:text-gray-200 dark:border-gray-300 rounded-md outline-none"
            >
              <option value="light">روشن</option>
              <option value="dark">تاریک</option>
            </select>
          </div>
        </div>
        <div>
          <h2 className="text-xl dark:text-white font-semibold mb-4">
            تنظیمات محتوا
          </h2>
          <div className="flex flex-col">
            <label
              htmlFor="rowsIndex"
              className="mb-2 dark:text-gray-400 font-medium"
            >
              تعداد ردیف ها در هر جدول
            </label>
            <input
              type="text"
              id="rowsIndex"
              value={formData.rowsIndex || ""}
              onChange={handleChange}
              className="p-2 h-10 dark:bg-slate-700 border dark:text-gray-300 dark:border-gray-300 outline-none rounded-md"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl dark:text-white font-semibold mb-4">
            تنظیمات دیدگاه‌ها
          </h2>
          <div className="flex items-center justify-between">
            <label
              htmlFor="commentsEnabled"
              className="dark:text-gray-400 font-medium"
            >
              فعال‌/غیرفعال سازی دیدگاه‌ها
            </label>
            <input
              type="checkbox"
              id="commentsEnabled"
              checked={formData.commentsEnabled || false}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>
        </div>
        <div className="pt-4 border-t dark:border-gray-700">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashSettings;

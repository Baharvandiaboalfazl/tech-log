import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateUser, changeUserRole } from "../../redux/user/userSlice";

const EditUserModal = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      مقاله;
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRoleChange = (userId, newRole) => {
    if (user.role === "admin" && newRole !== "admin") {
      toast.error("نمی‌توان نقش مدیر اصلی را تغییر داد.");
      return;
    }

    dispatch(changeUserRole({ userId, newRole }))
      .unwrap()
      .then((updatedUser) => {
        toast.success(`نقش کاربر ${updatedUser.username} با موفقیت تغییر کرد.`);
        setFormData((prev) => ({ ...prev, role: updatedUser.role }));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { role, ...updateData } = formData;

    dispatch(updateUser({ userId: user._id, formData: updateData }))
      .unwrap()
      .then(() => {
        toast.success("کاربر با موفقیت به‌روزرسانی شد.");
        onClose();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg p-6 bg-white dark:bg-slate-800 dark:text-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4">
          ویرایش کاربر: {user?.username}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              نام کاربری
            </label>
            <input
              id="username"
              type="text"
              value={formData.username || ""}
              onChange={handleChange}
              className="w-full h-10 p-2 border dark:border-gray-400 rounded-md dark:bg-slate-700 outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              ایمیل
            </label>
            <input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full h-10 p-2 border dark:border-gray-400 rounded-md dark:bg-slate-700 outline-none"
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1">
              نقش
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
              className="px-1 py-2 w-25 rounded-lg bg-gray-100 dark:bg-slate-700 border-none outline-none"
            >
              <option value="admin">مدیر</option>
              <option value="user">کاربر</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border dark:border-slate-600"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-4 left-4">
          <FiX className="dark:text-white cursor-pointer" size={25} />
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;

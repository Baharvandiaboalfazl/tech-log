import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../redux/post/postSlice";
import { fetchCategories } from "../../redux/category/categorySlice";
import ImageUploader from "./ImageUploader";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import toast from "react-hot-toast";
import { HiX } from "react-icons/hi";

const UpdatePostModal = ({ isOpen, onClose, postToEdit, onPostUpdated }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    if (isOpen && postToEdit) {
      dispatch(fetchCategories());
      setFormData({
        ...postToEdit,
        category: postToEdit.category?._id || "",
      });
    }
  }, [isOpen, postToEdit, dispatch]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({ postId: formData._id, userId: currentUser._id, formData })
    )
      .unwrap()
      .then((updatedPost) => {
        onPostUpdated(updatedPost);
        onClose();
      })
      .catch((err) => toast.error(err));
  };

  const handleImageUploadSuccess = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl h-[95vh] flex flex-col p-6 mx-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl"
        dir="rtl"
      >
        <h1 className="text-center text-3xl mb-7 dark:text-white font-semibold flex-shrink-0">
          ویرایش مقاله
        </h1>

        {loading || !formData.title ? (
          <div className="flex-1 flex justify-center items-center">
            <p>در حال بارگذاری اطلاعات مقاله...</p>
          </div>
        ) : (
          <form
            className="flex flex-col justify-between gap-4 flex-1 overflow-y-auto pr-2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  id="title"
                  required
                  className="flex-grow px-3 py-2 border dark:border-gray-500 dark:text-white outline-none rounded-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  value={formData.title || ""}
                />
                <select
                  id="category"
                  required
                  value={formData.category || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="px-3 py-2 border dark:border-gray-500 dark:bg-slate-700 dark:text-white outline-none rounded-lg"
                >
                  <option value="" disabled>
                    انتخاب دسته‌بندی
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <ImageUploader
                onImageUploadSuccess={handleImageUploadSuccess}
                initialImage={formData.image}
              />
              <div>
                <ReactQuill
                  theme="snow"
                  className="bg-white min-h-[200px]"
                  required
                  onChange={(value) =>
                    setFormData({ ...formData, content: value })
                  }
                  value={formData.content || ""}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-4 border-t border-b dark:border-gray-700 mt-4">
                <label
                  htmlFor="allowComments"
                  className="dark:text-white font-medium"
                >
                  اجازه ثبت دیدگاه
                </label>
                <input
                  type="checkbox"
                  id="allowComments"
                  checked={formData.allowComments}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      allowComments: e.target.checked,
                    })
                  }
                  className="w-5 h-5"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 mt-auto"
              >
                {loading ? "در حال به‌روزرسانی..." : "به‌روزرسانی پست"}
              </button>
            </div>
            {error && (
              <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 dark:text-white cursor-pointer"
        >
          <HiX size={25} />
        </button>
      </div>
    </div>
  );
};

export default UpdatePostModal;

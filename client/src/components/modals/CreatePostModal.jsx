import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../redux/post/postSlice";
import { fetchCategories } from "../../redux/category/categorySlice";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import ImageUploader from "./ImageUploader";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ align: [] }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ],
};

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    allowComments: true,
  });

  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.category
  );
  const { loading: postLoading, error: postError } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [isOpen, dispatch, categories.length]);

  if (!isOpen) return null;

  const handleImageUploadSuccess = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(formData))
      .unwrap()
      .then((newPost) => {
        onPostCreated(newPost);
        navigate(`/post/${newPost.slug}`);
        onClose();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl h-[95vh] flex flex-col p-6 mx-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl"
        dir="rtl"
      >
        <h1 className="text-center dark:text-white text-3xl mb-7 font-semibold flex-shrink-0">
          ایجاد مقاله جدید
        </h1>

        <form
          className="flex flex-col justify-between gap-4 flex-1 overflow-y-auto pr-2"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="عنوان مقاله"
                id="title"
                required
                className="flex-grow h-10 px-3 py-2 border border-gray-400 rounded-lg outline-none dark:text-white"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="px-3 h-10 border border-gray-400 rounded-lg outline-none dark:text-white"
              >
                <option value="" disabled>
                  انتخاب دسته‌بندی
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                    className="text-gray-900"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <ImageUploader onImageUploadSuccess={handleImageUploadSuccess} />

            <div>
              <ReactQuill
                theme="snow"
                modules={quillModules}
                className="bg-white"
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-4 border-t border-b dark:border-gray-700">
              <label
                htmlFor="allowComments"
                className="font-medium text-gray-700 dark:text-gray-200"
              >
                اجازه ثبت دیدگاه
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="allowComments"
                  className="sr-only peer"
                  checked={formData.allowComments}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      allowComments: e.target.checked,
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <button
              type="submit"
              disabled={postLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 mt-auto"
            >
              {postLoading ? "در حال انتشار..." : "انتشار پست"}
            </button>
            {postError && (
              <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {postError}
              </div>
            )}
          </div>
        </form>

        <button onClick={onClose} className="absolute top-4 left-4">
          <FiX className="dark:text-white cursor-pointer" size={25} />
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;

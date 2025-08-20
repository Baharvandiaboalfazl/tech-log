import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../../redux/category/categorySlice";
import toast from "react-hot-toast";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Modal from "../modals/Modal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const formContainerVariants = {
  hidden: { opacity: 0, height: 0, y: -20 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const App = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const [newName, setNewName] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");

  console.log(categoryIdToDelete);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("نام دسته‌بندی نمی‌تواند خالی باشد.");
      return;
    }
    dispatch(createCategory({ name: newName }));
    setNewName("");
    setIsFormVisible(false);
    toast.success("دسته بندی با موفقیت ایجاد شد.");
  };

  const handleDeleteCategory = () => {
    setShowModal(false);
    dispatch(deleteCategory(categoryIdToDelete))
      .then((originalPromiseResult) => {
        toast.success("دسته‌بندی با موفقیت حذف شد!");
      })
      .unwrap()
      .catch((err) => toast.error(err));
  };

  return (
    <div className="bg-slate-100 dark:bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
            مدیریت دسته‌بندی‌ها
          </h1>
          <motion.button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus />
            {isFormVisible ? "بستن فرم" : "افزودن جدید"}
          </motion.button>
        </div>

        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              variants={formContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8 overflow-hidden"
            >
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    نام دسته‌بندی جدید
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="مثلا: آموزش ری‌اکت"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="text-left">
                  <motion.button
                    type="submit"
                    className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ایجاد دسته‌بندی
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            لیست دسته‌بندی‌ها
          </h2>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <AnimatePresence>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <motion.li
                    key={category._id}
                    variants={itemVariants}
                    exit="exit"
                    layout
                    className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {category.name}
                    </span>
                    <motion.button
                      onClick={() => {
                        setShowModal(true);
                        setCategoryIdToDelete(category._id);
                      }}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-gray-600 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaRegTrashAlt />
                    </motion.button>
                  </motion.li>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  هیچ دسته‌بندی برای نمایش وجود ندارد.
                </p>
              )}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteCategory}
        title="حذف پست"
      >
        آیا از حذف این پست اطمینان دارید؟
      </Modal>
    </div>
  );
};

export default App;

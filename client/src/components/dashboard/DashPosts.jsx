import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/post/postSlice";
import { fetchCategories } from "../../redux/category/categorySlice";
import toast from "react-hot-toast";
import { FiPlusCircle } from "react-icons/fi";
import useDebounce from "../../hooks/useDebounce";
import CreatePostModal from "../modals/CreatePostModal";
import DashPostsSkeleton from "../skeleton/DashPostsSkeleton ";
import PaginationButtons from "../PaginationButtons";
import PostsTable from "./posts/PostsTable";
import PostsFilter from "./posts/PostsFilter";
import UpdatePostModal from "../modals/UpdatePostModal";
import { motion } from "framer-motion";

const DashPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({ searchTerm: "", category: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  const { currentUser, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const {
    posts,
    loading: postLoading,
    totalPosts,
  } = useSelector((state) => state.post);
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.category
  );
  const { settings, loading: settingsLoading } = useSelector(
    (state) => state.settings
  );

  const handlePostCreated = (newPost) => {
    setIsModalOpen(false);
    toast.success("پست یا موفقیت ایجاد شد.");
  };

  const handleEditClick = (post) => {
    setPostToEdit(post);
    setIsModalUpdateOpen(true);
  };

  const handlePostUpdate = () => {
    setIsModalUpdateOpen(false);
    toast.success("پست با موفقیت آپدیت شد.");
  };

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("tab", "posts");
    if (debouncedSearchTerm) urlParams.set("searchTerm", debouncedSearchTerm);
    else urlParams.delete("searchTerm");
    if (filters.category) urlParams.set("category", filters.category);
    else urlParams.delete("category");
    navigate(`?${urlParams.toString()}`);
  }, [debouncedSearchTerm, filters.category, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (!currentUser.role === "admin") {
      urlParams.set("userId", currentUser._id);
    }
    const searchQuery = urlParams.toString();
    if (currentUser.role === "admin" || currentUser.role === "editor") {
      dispatch(fetchPosts(searchQuery)).unwrap();
    }
    dispatch(fetchCategories());
  }, [location.search, currentUser, dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const postsPerPage = settings.rowsIndex || 9;

  const handlePageChange = (newStartIndex) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", newStartIndex);
    navigate(`?${urlParams.toString()}`);
  };

  const urlParams = new URLSearchParams(location.search);
  const startIndex = parseInt(urlParams.get("startIndex")) || 0;

  if (
    !currentUser ||
    (currentUser.role !== "admin" && currentUser.role !== "editor")
  ) {
    return <p className="p-6">شما اجازه دسترسی به این صفحه را ندارید.</p>;
  }

  if (userLoading && postLoading && categoryLoading && settingsLoading) {
    return <DashPostsSkeleton index={postsPerPage} />;
  }

  return (
    <div className="px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            مدیریت مقاله ها ({totalPosts})
          </h1>
          <motion.button
            type="submit"
            className=""
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/create-post"
              state={{ backgroundLocation: location }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              <FiPlusCircle />
              ایجاد مقاله جدید
            </Link>
          </motion.button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <PostsFilter
            categories={categories}
            handleFilterChange={handleFilterChange}
            filters={filters}
          />

          <PostsTable
            posts={posts}
            currentUser={currentUser}
            postLoading={postLoading}
            rowsIndex={postsPerPage}
            onEditClick={handleEditClick}
          />
        </div>
        <PaginationButtons
          handlePageChange={handlePageChange}
          totalDataNumber={totalPosts}
          rowsIndex={postsPerPage}
          startIndex={startIndex}
        />
      </div>

      <UpdatePostModal
        isOpen={isModalUpdateOpen}
        onClose={() => setIsModalUpdateOpen(false)}
        postToEdit={postToEdit}
        onPostUpdated={handlePostUpdate}
      />
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default DashPosts;

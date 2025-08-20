import { Link } from "react-router-dom";
import TableBodySkeleton from "../../skeleton/TableBodySkeleton ";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { deletePost } from "../../../redux/post/postSlice";
import { useDispatch } from "react-redux";
import Modal from "../../modals/Modal";
import toast from "react-hot-toast";

const PostsTable = ({
  posts,
  currentUser,
  postLoading,
  rowsIndex,
  onEditClick,
}) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const handleDeletePost = () => {
    setShowModal(false);
    dispatch(deletePost({ postId: postIdToDelete, userId: currentUser._id }))
      .unwrap()
      .then(toast.success("مقاله با موفقیت حذف شد"))
      .catch((err) => toast.error(err));
  };

  return (
    <div className="overflow-x-auto">
      {posts.length > 0 ? (
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-4 font-medium">تاریخ بروزرسانی</th>
              <th className="p-4 font-medium">تصویر</th>
              <th className="p-4 font-medium">عنوان</th>
              {currentUser.role === "admin" && (
                <th className="p-4 font-medium">نویسنده</th>
              )}
              <th className="p-4 font-medium">دسته‌بندی</th>
              <th className="p-4 font-medium text-center">عملیات</th>
            </tr>
          </thead>{" "}
          {postLoading ? (
            <TableBodySkeleton rows={rowsIndex} />
          ) : (
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 max-md:divide-y-0">
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50"
                >
                  <td className="p-4 whitespace-nowrap dark:text-white">
                    {new Date(post.updatedAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="p-4">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-24 h-12 object-cover rounded-md"
                      />
                    </Link>
                  </td>
                  <td className="p-4 font-medium dark:text-slate-200 hover:underline">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  {currentUser.role === "admin" && (
                    <td className="p-4">
                      {post.userId ? (
                        <Link
                          to={`/dashboard?tab=users&userId=${post.userId?._id}`}
                          className="hover:underline text-blue-500"
                        >
                          {post.userId.username}
                        </Link>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  )}
                  <td className="p-4">
                    <Link
                      to={`/categories?cat=${post.category?.slug}`}
                      className="hover:underline text-orange-500"
                    >
                      {post.category?.name}
                    </Link>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                      >
                        <FiTrash2 />
                        <span>حذف</span>
                      </button>
                      <Link
                        to={`/update-post/${post._id}`}
                        state={{ backgroundLocation: location }}
                        className="text-teal-500 hover:text-teal-700 flex items-center gap-1"
                        onClick={() => onEditClick(post)}
                      >
                        <FiEdit />
                        <span>ویرایش</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      ) : (
        <p className="text-center p-8 text-gray-500">هیچ مقاله ای یافت نشد.</p>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeletePost}
        title="حذف پست"
      >
        آیا از حذف این پست اطمینان دارید؟
      </Modal>
    </div>
  );
};

export default PostsTable;

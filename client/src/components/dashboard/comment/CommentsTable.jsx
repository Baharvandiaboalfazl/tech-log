import { FaCheck, FaTimes } from "react-icons/fa";
import TableBodySkeleton from "../../skeleton/TableBodySkeleton ";
import { Link } from "react-router-dom";

const CommentsTable = ({
  loading,
  commentPerPage,
  commentsToShow,
  setActionType,
  setItemToModify,
  setShowModal,
}) => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-x-auto">
      <table className="w-full text-sm text-right">
        <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3">تاریخ</th>
            <th className="px-6 py-3">متن نظر کاربر</th>
            <th className="px-6 py-3">پست مربوطه</th>
            <th className="px-6 py-3">کاربر</th>
            <th className="px-6 py-3">وضعیت مسدودیت</th>
            <th className="px-6 py-3">عملیات</th>
          </tr>
        </thead>
        {loading ? (
          <TableBodySkeleton rows={commentPerPage} />
        ) : (
          <tbody className="divide-y dark:divide-gray-700">
            {commentsToShow.map((comment) => (
              <tr
                key={comment._id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 dark:text-white">
                  {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="px-6 py-4 dark:text-white">
                  <Link
                    to={`/post/${comment.postId?.slug}#comment-${comment._id}`}
                    className="hover:underline"
                  >
                    {comment.content}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/post/${comment.postId?.slug}`}
                    className="hover:underline text-blue-500"
                  >
                    {comment.postId?.title || "پست حذف شده"}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/dashboard?tab=users&userId=${comment.userId?._id}`}
                    className="hover:underline text-teal-500"
                  >
                    {comment.userId?.username || "کاربر حذف شده"}
                  </Link>
                </td>
                <td className="px-6 py-4 text-center">
                  {comment.userId ? (
                    comment.userId.isBanned ? (
                      <FaCheck className="text-green-500 mx-auto" />
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4 flex flex-col gap-2">
                  <span
                    onClick={() => {
                      setActionType("delete");
                      setItemToModify(comment);
                      setShowModal(true);
                    }}
                    className="text-red-500 font-medium hover:underline cursor-pointer"
                  >
                    حذف نظر
                  </span>
                  {comment.userId &&
                    (comment.userId.isBanned ? (
                      <span
                        onClick={() => {
                          setActionType("unban");
                          setItemToModify(comment);
                          setShowModal(true);
                        }}
                        className="text-green-500 font-medium hover:underline cursor-pointer"
                      >
                        رفع مسدودیت
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          setActionType("ban");
                          setItemToModify(comment);
                          setShowModal(true);
                        }}
                        className="text-orange-500 font-medium hover:underline cursor-pointer"
                      >
                        مسدود کردن
                      </span>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default CommentsTable;

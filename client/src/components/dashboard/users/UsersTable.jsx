import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import TableBodySkeleton from "../../skeleton/TableBodySkeleton ";
import { CgUnblock, CgBlock } from "react-icons/cg";

const UsersTable = ({
  loading,
  usersPerPage,
  users,
  handleEditClick,
  currentUser,
  setActionType,
  setUserToModify,
  setShowModal,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs text-gray-500">
          <tr>
            <th className="p-4 font-medium">کاربر</th>
            <th className="p-4 font-medium">نقش</th>
            <th className="p-4 font-medium">تاریخ عضویت</th>
            <th className="p-4 font-medium">تأیید شده</th>
            <th className="p-4 font-medium">مسدودیت</th>
            <th className="p-4 font-medium">عملیات</th>
          </tr>
        </thead>

        {loading ? (
          <TableBodySkeleton rows={usersPerPage} />
        ) : (
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 max-md:divide-y-0">
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50"
              >
                <td className="p-4 whitespace-nowrap dark:text-white">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={user.avatar}
                      alt={user.username}
                    />
                    <div>
                      {user.role === "editor" || user.role === "admin" ? (
                        <Link
                          to={`/author/${user.username}`}
                          target="_blank"
                          className="hover:underline text-blue-500 font-bold"
                        >
                          {user.username}
                        </Link>
                      ) : (
                        <p>{user.username}</p>
                      )}

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap dark:text-white">
                  <span>{user.role}</span>
                </td>
                <td className="p-4 whitespace-nowrap dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-4 whitespace-nowrap dark:text-white">
                  {user.isVerified ? (
                    <FaCheck className="text-green-500 mx-auto" />
                  ) : (
                    <FaTimes className="text-red-500 mx-auto" />
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {user.isBanned ? (
                    <FaCheck className="text-green-500 mx-auto" />
                  ) : (
                    <FaTimes className="text-red-500 mx-auto" />
                  )}
                </td>
                <td className="flex flex-col items-center justify-center gap-1 px-2 py-4">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="flex items-center gap-1 text-teal-500 font-medium hover:underline cursor-pointer"
                  >
                    <FiEdit />
                    <span>ویرایش</span>
                  </button>
                  {currentUser._id !== user._id && (
                    <div className="flex flex-col gap-1">
                      {user.isBanned ? (
                        <button
                          onClick={() => {
                            setActionType("unban");
                            setUserToModify(user);
                            setShowModal(true);
                          }}
                          className="flex items-center gap-1 text-green-500 font-medium hover:underline cursor-pointer"
                        >
                          <CgUnblock />
                          <span>رفع مسدودیت</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setActionType("ban");
                            setUserToModify(user);
                            setShowModal(true);
                          }}
                          className="flex items-center gap-1 text-orange-500 font-medium hover:underline cursor-pointer"
                        >
                          <CgBlock />
                          <span>مسدود کردن</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setActionType("delete");
                          setUserToModify(user);
                          setShowModal(true);
                        }}
                        className="flex items-center gap-1 mt-1 text-red-500 font-medium hover:underline cursor-pointer"
                      >
                        <FiTrash2 />
                        <span>حذف</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default UsersTable;

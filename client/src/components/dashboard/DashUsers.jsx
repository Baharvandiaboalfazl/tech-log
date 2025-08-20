import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchUsers,
  deleteUser,
  banUser,
  unbanUser,
} from "../../redux/user/userSlice";
import { fetchSettings } from "../../redux/settings/settingsSlice";
import EditUserModal from "../modals/EditUserModal";
import Modal from "../modals/Modal";
import useDebounce from "../../hooks/useDebounce";
import PaginationButtons from "../PaginationButtons";
import UsersTable from "./users/UsersTable";
import UsersFilter from "./users/UsersFilter";

const DashUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);
  const { users, totalUsers, loading, error } = useSelector(
    (state) => state.user
  );
  const { settings } = useSelector((state) => state.settings);

  const [filters, setFilters] = useState({ searchTerm: "", role: "all" });
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToModify, setUserToModify] = useState(null);
  const [actionType, setActionType] = useState("");

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("tab", "users");

    if (debouncedSearchTerm) {
      urlParams.set("searchTerm", debouncedSearchTerm);
    } else {
      urlParams.delete("searchTerm");
    }

    if (filters.role !== "all") {
      urlParams.set("role", filters.role);
    } else {
      urlParams.delete("role");
    }

    if (filters.isVerified && filters.isVerified !== "all") {
      urlParams.set("isVerified", filters.isVerified);
    } else {
      urlParams.delete("isVerified");
    }

    if (filters.isBanned && filters.isBanned !== "all") {
      urlParams.set("isBanned", filters.isBanned);
    } else {
      urlParams.delete("isBanned");
    }

    navigate(`?${urlParams.toString()}`);
  }, [
    debouncedSearchTerm,
    filters.role,
    filters.isVerified,
    filters.isBanned,
    navigate,
  ]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const urlParams = new URLSearchParams(location.search);
      if (currentUser.role === "admin") {
        dispatch(fetchUsers(urlParams.toString()));
      }
    };
    fetchUsersData();
  }, [location.search, currentUser, dispatch]);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const handleUpdateSuccess = (updatedUser) => {
    dispatch(fetchUsers(new URLSearchParams(location.search).toString()));
  };

  const handleEditClick = (userToEdit) => {
    setUserToEdit(userToEdit);
    setShowEditModal(true);
  };

  const handleActionConfirm = () => {
    let actionThunk;
    let successMessage = "";

    if (actionType === "delete") {
      actionThunk = deleteUser(userToModify._id);
      successMessage = `کاربر ${userToModify.username} حذف شد.`;
    } else if (actionType === "ban") {
      actionThunk = banUser(userToModify._id);
      successMessage = `کاربر ${userToModify.username} مسدود شد.`;
    } else if (actionType === "unban") {
      actionThunk = unbanUser(userToModify._id);
      successMessage = `کاربر ${userToModify.username} رفع مسدودیت شد.`;
    }

    setShowConfirmModal(false);
    dispatch(actionThunk)
      .unwrap()
      .then(() => {
        toast.success(successMessage);
        dispatch(fetchUsers(new URLSearchParams(location.search).toString()));
      })
      .catch((err) => toast.error(err));
  };

  const handlePageChange = (newStartIndex) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", newStartIndex);
    navigate(`/categories&${urlParams.toString()}`);
  };

  const usersPerPage = settings.rowsIndex || 9;

  const startIndex =
    parseInt(new URLSearchParams(location.search).get("startIndex")) || 0;

  return (
    <div className="px-4 py-10">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          مدیریت کاربران ({totalUsers})
        </h1>
        <UsersFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
        />

        <UsersTable
          loading={loading}
          usersPerPage={usersPerPage}
          users={users}
          currentUser={currentUser}
          setActionType={setActionType}
          setUserToModify={setUserToModify}
          setShowModal={setShowConfirmModal}
          handleEditClick={handleEditClick}
        />

        <PaginationButtons
          handlePageChange={handlePageChange}
          totalDataNumber={totalUsers}
          rowsIndex={usersPerPage}
          startIndex={startIndex}
        />
      </main>
      <EditUserModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={userToEdit}
        onUserUpdated={handleUpdateSuccess}
      />
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleActionConfirm}
        title={
          actionType === "ban"
            ? "مسدود کردن کاربر"
            : actionType === "unban"
            ? "رفع مسدودیت کاربر"
            : "حذف کاربر"
        }
      >
        آیا از انجام این عملیات برای کاربر{" "}
        <span className="font-bold">{userToModify?.username}</span> اطمینان
        دارید؟
      </Modal>
    </div>
  );
};

export default DashUsers;

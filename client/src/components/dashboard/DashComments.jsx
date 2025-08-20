import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchAllComments,
  deleteComment,
} from "../../redux/comment/commentSlice";
import { banUser, unbanUser } from "../../redux/user/userSlice";
import Modal from "../modals/Modal";
import PaginationButtons from "../PaginationButtons";
import CommentsTable from "./comment/CommentsTable";

const DashComments = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [commentsToShow, setCommentsToShow] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToModify, setItemToModify] = useState(null);
  const [actionType, setActionType] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  const {
    allComments: comments,
    totalComments,
    loading,
    error,
  } = useSelector((state) => state.comment);
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    if (currentUser.role === "admin") {
      const urlParams = new URLSearchParams(location.search);
      dispatch(fetchAllComments(urlParams.toString()));
    }
  }, [location.search, currentUser, dispatch]);

  useEffect(() => {
    setCommentsToShow(comments);
  }, [comments, totalComments]);

  const handleActionConfirm = () => {
    setShowModal(false);
    let actionThunk;
    let successMessage = "";

    if (actionType === "delete") {
      actionThunk = deleteComment(itemToModify._id);
      successMessage = "دیدگاه با موفقیت حذف شد.";
    } else if (actionType === "ban") {
      actionThunk = banUser(itemToModify.userId._id);
      successMessage = `کاربر ${itemToModify.userId.username} مسدود شد.`;
    } else if (actionType === "unban") {
      actionThunk = unbanUser(itemToModify.userId._id);
      successMessage = `کاربر ${itemToModify.userId.username} رفع مسدودیت شد.`;
    }

    dispatch(actionThunk)
      .unwrap()
      .then(() => {
        toast.success(successMessage);
        dispatch(
          fetchAllComments(new URLSearchParams(location.search).toString())
        );
      })
      .catch((err) => toast.error(err));
  };

  const handlePageChange = (newStartIndex) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", newStartIndex);
    navigate(`/dashboard?tab=comments&${urlParams.toString()}`);
  };

  const commentPerPage = settings.rowsIndex || 9;

  const startIndex =
    parseInt(new URLSearchParams(location.search).get("startIndex")) || 0;

  return (
    <div className="max-w-7xl mx-auto py-10">
      {currentUser.role === "admin" && commentsToShow.length > 0 ? (
        <>
          <h1 className="text-2xl dark:text-white font-bold mb-6">
            مدیریت دیدگاه ها ({totalComments})
          </h1>

          <CommentsTable
            loading={loading}
            commentPerPage={commentPerPage}
            commentsToShow={commentsToShow}
            setActionType={setActionType}
            setItemToModify={setItemToModify}
            setShowModal={setShowModal}
          />

          <PaginationButtons
            handlePageChange={handlePageChange}
            totalDataNumber={totalComments}
            rowsIndex={commentPerPage}
            startIndex={startIndex}
          />
        </>
      ) : (
        <p>هیچ دیدگاهی برای نمایش وجود ندارد.</p>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleActionConfirm}
        title={
          actionType === "delete"
            ? "حذف نظر کاربر"
            : actionType === "ban"
            ? "مسدود کردن کاربر"
            : "رفع مسدودیت کاربر"
        }
      >
        آیا از انجام این عملیات اطمینان دارید؟
      </Modal>
    </div>
  );
};

export default DashComments;

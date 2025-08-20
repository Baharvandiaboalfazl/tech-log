import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCommentsByPost,
  createComment,
  likeComment,
  editComment,
  deleteComment,
  clearComments,
} from "../../redux/comment/commentSlice";
import toast from "react-hot-toast";
import Comment from "./Comment";
import Modal from "../modals/Modal";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [activeReply, setActiveReply] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const {
    postComments: comments,
    loading,
    error,
  } = useSelector((state) => state.comment);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      dispatch(fetchCommentsByPost(postId));
    }
    return () => {
      dispatch(clearComments());
    };
  }, [postId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.length > 200) return;
    dispatch(
      createComment({
        content: comment,
        postId,
        userId: currentUser._id,
        parentId: activeReply ? activeReply.commentId : null,
      })
    )
      .unwrap()
      .then(() => {
        setComment("");
        setActiveReply(null);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleLike = (commentId) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    dispatch(likeComment(commentId));
  };

  const handleReply = (commentId, username) => {
    setActiveReply({ commentId, username });
  };

  const handleEdit = (commentId, editedContent) => {
    dispatch(editComment({ commentId, content: editedContent }));
  };

  const handleDelete = () => {
    if (!commentToDelete) return;
    dispatch(deleteComment(commentToDelete))
      .unwrap()
      .then(() => {
        setCommentToDelete(null);
      })
      .catch((err) => toast.error(err));
  };

  const nestedComments = useMemo(() => {
    if (!comments) return [];
    const commentMap = {};
    comments.forEach((c) => {
      commentMap[c._id] = { ...c, replies: [] };
    });
    const result = [];
    for (const commentId in commentMap) {
      const comment = commentMap[commentId];
      if (comment.parentId && commentMap[comment.parentId]) {
        commentMap[comment.parentId].replies.push(comment);
      } else {
        result.push(comment);
      }
    }
    return result;
  }, [comments]);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-2 my-5 text-gray-500 text-sm">
          <p>وارد شده با نام:</p>
          <img
            className="h-6 w-6 object-cover rounded-full"
            src={currentUser.avatar}
            alt={currentUser.username}
          />
          <Link
            className="text-xs text-cyan-600 hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          برای ثبت دیدگاه باید وارد شوید.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            ورود به حساب
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          onSubmit={handleSubmit}
        >
          {activeReply && (
            <div className="text-sm text-gray-500 mb-2">
              <span>در حال پاسخ به </span>
              <span className="font-bold">@{activeReply.username}</span>
              <button
                type="button"
                onClick={() => setActiveReply(null)}
                className="text-red-500 mr-2"
              >
                (لغو)
              </button>
            </div>
          )}
          <textarea
            placeholder="دیدگاه خود را بنویسید..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="w-full p-2 bg-gray-50 dark:bg-gray-800 dark:text-white border-0 focus:ring-2 focus:ring-blue-500 rounded-md"
          />
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} کاراکتر باقی مانده
            </p>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              ارسال
            </button>
          </div>
        </form>
      )}

      {loading && (
        <p className="text-sm my-5 text-center">در حال بارگذاری دیدگاه‌ها...</p>
      )}
      {error && (
        <p className="text-sm my-5 text-center text-red-500">{error}</p>
      )}

      {!loading && comments && comments.length > 0 ? (
        <>
          <div className="text-sm my-5 flex items-center gap-2">
            <p className="font-semibold dark:text-white">دیدگاه‌ها</p>
            <div className="border border-gray-400 dark:text-white py-0.5 px-2 rounded-md">
              <p>{comments.length}</p>
            </div>
          </div>
          {nestedComments.map((c) => (
            <Comment
              key={c._id}
              comment={c}
              onLike={handleLike}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setCommentToDelete(commentId);
                setShowModal(true);
              }}
            />
          ))}
        </>
      ) : (
        !loading && (
          <p className="text-sm my-5 text-center text-gray-500">
            هنوز دیدگاهی ثبت نشده است.
          </p>
        )
      )}

      <Modal
        isOpen={!!commentToDelete}
        onClose={() => setCommentToDelete(null)}
        onConfirm={handleDelete}
        title="حذف دیدگاه"
      >
        آیا از حذف این دیدگاه اطمینان دارید؟ این عمل غیرقابل بازگشت است.
      </Modal>
    </div>
  );
};

export default CommentSection;

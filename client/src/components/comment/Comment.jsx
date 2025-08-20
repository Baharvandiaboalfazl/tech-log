import moment from "moment-jalaali";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike, onReply, onEdit, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleSaveEdit = () => {
    onEdit(comment, editedContent);
    setIsEditing(false);
  };

  return (
    <div
      id={`comment-${comment._id}`}
      className="flex p-4 border-b dark:border-gray-700 text-sm"
    >
      <div className="flex-shrink-0 ml-3">
        <Link to={`/author/${comment.userId?.username}`}>
          <img
            className="w-10 h-10 rounded-full bg-gray-200 object-cover"
            src={comment.userId?.avatar}
            alt={comment.userId?.username}
          />
        </Link>
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate text-gray-800 dark:text-gray-200">
            {comment.userId ? `@${comment.userId.username}` : "کاربر حذف شده"}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <>
            <textarea
              className="w-full p-2 my-2 rounded-md border bg-gray-100 dark:bg-slate-700"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              maxLength="200"
            />
            <div className="flex justify-end gap-2 text-sm">
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                ذخیره
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                انصراف
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 pb-2">
            {comment.content}
          </p>
        )}

        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-4 mt-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`flex items-center gap-1 text-gray-500 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "text-blue-500"
            }`}
          >
            <FaThumbsUp />
            {comment.numberOfLikes > 0 && <p>{comment.numberOfLikes}</p>}
          </button>

          <button
            type="button"
            onClick={() => onReply(comment._id, comment.userId?.username)}
            className="text-gray-500 hover:text-blue-500"
          >
            پاسخ
          </button>

          {currentUser &&
            (currentUser._id === comment.userId?._id || currentUser.isAdmin) &&
            !isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-gray-500 hover:text-green-500"
                >
                  ویرایش
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(comment._id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  حذف
                </button>
              </>
            )}
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2 pr-4 border-r-2 border-gray-200 dark:border-gray-600">
            {comment.replies.map((reply) => (
              <Comment
                key={reply._id}
                comment={reply}
                onLike={onLike}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

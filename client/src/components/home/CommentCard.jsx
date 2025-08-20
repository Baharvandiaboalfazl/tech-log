const CommentCard = ({ comment }) => {
  return (
    <figure className="relative w-72 md:w-80 lg:w-96 flex-shrink-0 rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg mx-4">
      <figcaption className="relative mt-2 flex items-center justify-start gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <img
          src={comment.userId.avatar}
          alt={comment.userId.username}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <div className="font-medium text-gray-800 dark:text-white">
            {comment.userId.username}
          </div>
        </div>
      </figcaption>
      <blockquote className="mt-4 text-gray-600 dark:text-gray-300">
        <p>{comment.content}</p>
      </blockquote>
    </figure>
  );
};

export default CommentCard;

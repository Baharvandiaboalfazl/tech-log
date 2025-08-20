import { Link } from "react-router-dom";
import moment from "moment-jalaali";

const PostCardSection = ({ post }) => {
  if (!post) return null;

  return (
    <article
      className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-lg"
      dir="rtl"
    >
      <div className="md:w-2/5 relative">
        <Link to={`/post/${post.slug}`}>
          <img
            className="h-56 w-full object-cover"
            src={post.image}
            alt={post.title}
          />
        </Link>
        <Link
          to={`/category/${post.category?.slug}`}
          className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
        >
          {post.category?.name || "دسته‌بندی نشده"}
        </Link>
      </div>

      <div className="md:w-3/5 p-6 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {moment(post.createdAt).fromNow()}
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            <Link to={`/post/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
            {post.content.replace(/<[^>]*>?/gm, "")}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={post.userId?.avatar}
            alt={post.userId?.username}
          />
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {post.userId?.username || "نویسنده"}
            </p>
            <p className="text-xs text-slate-500">نویسنده در Tech Log</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCardSection;

import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment-jalaali";

const ArticleCardGrid = ({ article }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <Link
            to={`/categories?cat=${article.category.slug}`}
            target="_blank"
            className="text-xs font-semibold text-blue-100 bg-blue-700 hover:bg-blue-600 hover:underline px-3 py-1 rounded-full"
          >
            {article.category.name}
          </Link>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white text-right mb-4 line-clamp-1">
          {article.title}
        </h3>

        <div className="text-sm text-gray-600 dark:text-gray-200 text-right flex-grow mr-3">
          {article.content.replace(/<[^>]*>?/gm, "").substring(0, 100)}...
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-600 p-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-200">
        <div className="flex items-center justify-between w-full">
          <Link
            to={`/author/${article.userId.username}`}
            target="_blank"
            className="flex items-center gap-1.5 text-blue-500 hover:underline"
          >
            <img src={article.userId.avatar} className="w-10 h-10" />
            {article.userId.username}
          </Link>
          <span className="mt-1">{moment(article.createdAt).fromNow()}</span>
        </div>
      </div>
      <Link
        to={`/post/${article.slug}`}
        className="flex justify-center bg-gray-50 dark:bg-gray-700 text-blue-700 dark:text-white font-semibold p-3 hover:bg-gray-100 dark:hover:bg-gray-600 items-center gap-2 hover:gap-3 transition-all duration-300"
      >
        ادامه مقاله
        <span className="transform transition-transform duration-300">
          <FaArrowLeft />
        </span>
      </Link>
    </div>
  );
};

export default ArticleCardGrid;

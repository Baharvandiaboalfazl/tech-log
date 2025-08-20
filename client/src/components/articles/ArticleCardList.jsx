import moment from "moment-jalaali";
import { FaArrowLeft } from "react-icons/fa";
import { LuCalendarDays, LuClock7 } from "react-icons/lu";
import { Link } from "react-router-dom";

const ArticleCardList = ({ article }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden flex w-full transition-shadow duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="w-1/4 min-w-[200px] bg-gray-200 flex items-center justify-center text-gray-400">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div>
            <Link
              to={`/categories?cat=${article.category.slug}`}
              target="_blank"
              className="text-xs font-semibold text-blue-100 bg-blue-700 hover:bg-blue-600 hover:underline px-3 py-1 rounded-full"
            >
              {article.category.name}
            </Link>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-white text-right mt-5">
          {article.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-200 text-right mt-3 flex-grow">
          {article.content.replace(/<[^>]*>?/gm, "").substring(0, 100)}...
        </p>

        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-wrap gap-2"></div>
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-200">
              <div className="flex items-center gap-1">
                <Link
                  to={`/author/${article.userId.username}`}
                  target="_blank"
                  className="flex items-center gap-1.5 text-blue-500 hover:underline"
                >
                  <img src={article.userId.avatar} className="w-10 h-10" />
                  {article.userId.username}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <LuCalendarDays size={20} />
                {moment(article.createdAt).fromNow()}
              </div>
              <div className="flex items-center gap-1">
                <LuClock7 size={20} />
                <span>
                  {(article.content.length / 1000).toFixed(0)}
                  دقیقه
                </span>
              </div>
            </div>
            <Link
              to={`/post/${article.slug}`}
              className="flex items-center gap-2 justify-center text-blue-700 dark:text-white font-semibold hover:gap-3 transition-all duration-300"
            >
              ادامه مقاله
              <span className="transform transition-transform duration-300">
                <FaArrowLeft />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardList;

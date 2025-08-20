const ArticleCardGridSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-600 rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <div className="h-48 bg-gray-300 dark:bg-slate-800 animate-pulse"></div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="h-5 w-24 bg-gray-300 dark:bg-slate-800 rounded-full mb-4 animate-pulse"></div>

        <div className="h-6 w-3/4 bg-gray-300 dark:bg-slate-800 rounded mb-4 animate-pulse"></div>

        <div className="space-y-2 flex-grow">
          <div className="h-4 w-full bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="border-t border-gray-100 p-4 flex justify-end">
        <div className="space-y-2 w-28">
          <div className="h-4 w-full bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-4 w-4/5 bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-slate-700 h-[50px] animate-pulse"></div>
    </div>
  );
};

export default ArticleCardGridSkeleton;

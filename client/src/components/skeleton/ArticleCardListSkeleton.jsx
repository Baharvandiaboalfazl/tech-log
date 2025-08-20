const ArticleCardListSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-600 rounded-xl border border-gray-200 shadow-sm overflow-hidden flex w-full">
      <div className="w-1/4 min-w-[200px] bg-gray-300 dark:bg-slate-800 animate-pulse"></div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div className="h-6 w-28 bg-gray-300 dark:bg-slate-800 rounded-full animate-pulse"></div>
          <div className="h-5 w-16 bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>

        <div className="h-7 w-4/5 bg-gray-300 dark:bg-slate-800 rounded mt-4 animate-pulse"></div>

        <div className="mt-3 space-y-2 flex-grow">
          <div className="h-4 w-full bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-4 w-11/12 bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
        </div>

        <div className="flex justify-end items-center mt-6">
          <div className="flex items-center gap-x-4">
            <div className="h-4 w-20 bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-300 dark:bg-slate-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardListSkeleton;

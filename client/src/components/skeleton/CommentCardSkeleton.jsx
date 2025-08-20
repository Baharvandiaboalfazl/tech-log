const CommentCardSkeleton = () => {
  return (
    <div className="relative w-72 md:w-80 lg:w-96 flex-shrink-0 rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg mx-4">
      <div className="relative mt-2 flex items-center justify-start gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        <div>
          <div className="h-5 w-32 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </div>
      <div className="mt-4 text-gray-600 dark:text-gray-300">
        <div className="space-y-3">
          <div className="h-4 w-full rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-4 w-5/6 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentCardSkeleton;

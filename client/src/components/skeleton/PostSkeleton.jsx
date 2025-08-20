const PostSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-3 animate-pulse" dir="rtl">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-4 mx-auto"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 mb-8 mx-auto"></div>
      <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl w-full mb-8"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;

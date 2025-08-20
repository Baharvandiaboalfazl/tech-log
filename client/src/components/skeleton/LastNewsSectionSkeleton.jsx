const SkeletonCard = () => (
  <div className="w-75 h-96 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg animate-pulse" />
);

const LastNewsSectionSkeleton = () => {
  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 dark:text-white mb-15">
        پست های اخیر
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default LastNewsSectionSkeleton;

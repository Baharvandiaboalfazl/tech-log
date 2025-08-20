const StatsCardSkeleton = () => (
  <div className="p-6 rounded-xl shadow-lg bg-gray-200 dark:bg-slate-700 animate-pulse">
    <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-3/4 mb-4"></div>
    <div className="h-8 bg-gray-300 dark:bg-slate-600 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-1/3"></div>
  </div>
);

const ChartSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
    <div className="h-[300px] bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
  </div>
);

const DataTableSkeleton = ({ rows = 5 }) => (
  <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-md h-full flex flex-col animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-1/4"></div>
    </div>
    <div className="overflow-x-auto flex-grow">
      <div className="w-full">
        <div className="h-8 bg-gray-50 dark:bg-gray-700 rounded-t-lg"></div>
        <div className="space-y-2 mt-2">
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 dark:bg-slate-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="max-w-7xl mx-auto py-10 px-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatsCardSkeleton />
      <StatsCardSkeleton />
      <StatsCardSkeleton />
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 mb-8">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center">
      <DataTableSkeleton />
      <DataTableSkeleton />
      <DataTableSkeleton />
    </div>
  </div>
);

export default DashboardSkeleton;

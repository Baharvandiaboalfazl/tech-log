const DashPostsSkeleton = ({ index }) => {
  const skeletonRows = index;

  return (
    <div
      className="bg-gray-50 dark:bg-slate-900 min-h-screen p-4 sm:p-6 lg:p-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
          <div className="h-10 w-36 bg-gray-300 dark:bg-slate-700 rounded-lg animate-pulse"></div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:flex-grow h-10.5 bg-gray-300 dark:bg-slate-700 rounded-lg animate-pulse"></div>
              <div className="w-full sm:w-40 h-10.5 bg-gray-300 dark:bg-slate-700 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase">
                <tr>
                  <th className="p-4">
                    <div className="h-4 w-24 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
                  </th>
                  <th className="p-4">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
                  </th>
                  <th className="p-4">
                    <div className="h-4 w-32 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
                  </th>
                  <th className="p-4">
                    <div className="h-4 w-20 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
                  </th>
                  <th className="p-4">
                    <div className="h-4 w-24 bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
                  </th>
                  <th className="p-4 text-center">
                    <div className="h-4 w-20 mx-auto bg-gray-300 dark:bg-slate-600 rounded animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-700">
                {Array.from({ length: skeletonRows }).map((_, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50"
                  >
                    <td className="p-4">
                      <div className="h-4 w-24 bg-gray-300 dark:bg-slate-700 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="w-24 h-12 bg-gray-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-40 bg-gray-300 dark:bg-slate-700 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-28 bg-gray-300 dark:bg-slate-700 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-20 bg-gray-300 dark:bg-slate-700 rounded animate-pulse"></div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-4">
                        <div className="h-6 w-16 bg-gray-300 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-6 w-16 bg-gray-300 dark:bg-slate-700 rounded animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <div className="h-10 w-20 bg-gray-300 dark:bg-slate-700 rounded-lg animate-pulse"></div>
          <div className="h-5 w-40 bg-gray-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-300 dark:bg-slate-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default DashPostsSkeleton;

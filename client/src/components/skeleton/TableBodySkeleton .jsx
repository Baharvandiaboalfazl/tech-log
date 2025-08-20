const TableBodySkeleton = ({ rows = 8 }) => {
  return (
    <tbody className="divide-y dark:divide-slate-700">
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="p-4">
            <div className="h-4 w-24 bg-gray-300 dark:bg-slate-700 rounded"></div>
          </td>
          <td className="p-4">
            <div className="w-24 h-12 bg-gray-300 dark:bg-slate-700 rounded-md"></div>
          </td>
          <td className="p-4">
            <div className="h-4 w-40 bg-gray-300 dark:bg-slate-700 rounded"></div>
          </td>
          <td className="p-4">
            <div className="h-4 w-28 bg-gray-300 dark:bg-slate-700 rounded"></div>
          </td>
          <td className="p-4">
            <div className="h-4 w-20 bg-gray-300 dark:bg-slate-700 rounded"></div>
          </td>
          <td className="p-4 whitespace-nowrap">
            <div className="flex items-center justify-center gap-4">
              <div className="h-6 w-16 bg-gray-300 dark:bg-slate-700 rounded"></div>
              <div className="h-6 w-16 bg-gray-300 dark:bg-slate-700 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBodySkeleton;

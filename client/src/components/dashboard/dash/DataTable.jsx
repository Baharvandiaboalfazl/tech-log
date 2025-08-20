import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const DataTable = ({
  title,
  headers,
  data,
  renderRow,
  viewAllLink,
  itemVariants,
}) => (
  <motion.div
    variants={itemVariants}
    className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-md h-full flex flex-col"
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold dark:text-white">{title}</h3>
      <Link
        to={viewAllLink}
        className="text-sm text-indigo-500 hover:underline"
      >
        مشاهده همه
      </Link>
    </div>
    <div className="overflow-x-auto flex-grow">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data &&
              data.map((item) => {
                const userRow = renderRow(item);
                return (
                  <motion.tr
                    key={item._id}
                    className={userRow.props.className}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(100, 116, 139, 0.1)",
                    }}
                  >
                    {userRow.props.children}
                  </motion.tr>
                );
              })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  </motion.div>
);

export default DataTable;

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ containerVariants, itemVariants, postStats }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <motion.div
      className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
        whileHover={{ y: -5 }}
      >
        <h3 className="text-xl font-semibold text-shadow-gray-900 dark:text-white mb-4">
          مقاله های ایجاد شده
        </h3>
        {postStats && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={postStats.postsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" name="تعداد پست‌ها" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
        whileHover={{ y: -5 }}
      >
        <h3 className="text-xl font-semibold text-shadow-gray-900 dark:text-white mb-4">
          تعداد مقاله ها بر اساس دسته‌بندی
        </h3>
        {postStats && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={postStats.postsByCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {postStats.postsByCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Charts;

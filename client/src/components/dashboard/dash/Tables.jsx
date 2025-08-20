import { motion } from "framer-motion";
import DataTable from "./DataTable";

const Tables = ({
  containerVariants,
  itemVariants,
  users,
  posts,
  comments,
}) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <DataTable
        title="کاربران اخیر"
        headers={["عکس کاربر", "نام کاربری"]}
        data={users}
        itemVariants={itemVariants}
        renderRow={(user) => (
          <tr key={user._id} className="border-b dark:border-gray-700">
            <td className="p-2">
              <img
                src={user.avatar}
                alt="user"
                className="w-10 h-10 rounded-full bg-gray-500 object-cover"
              />
            </td>
            <td className="p-2 dark:text-white">{user.username}</td>
          </tr>
        )}
        viewAllLink={"/dashboard?tab=users"}
      />
      <DataTable
        title="مقاله‌های اخیر"
        headers={["عکس مقاله", "عنوان مقاله"]}
        data={posts}
        itemVariants={itemVariants}
        renderRow={(post) => (
          <tr key={post._id} className="border-b dark:border-gray-700">
            <td className="p-2">
              <img
                src={post.image}
                alt="post"
                className="w-14 h-10 rounded-md bg-gray-500 object-cover"
              />
            </td>
            <td className="p-2 w-72 dark:text-white">{post.title}</td>
          </tr>
        )}
        viewAllLink={"/dashboard?tab=posts"}
      />
      <DataTable
        title="دیدگاه‌های اخیر"
        headers={["متن نظرات", "لایک‌ها"]}
        data={comments}
        itemVariants={itemVariants}
        renderRow={(comment) => (
          <tr key={comment._id} className="border-b dark:border-gray-700">
            <td
              className="p-2 w-96 truncate dark:text-gray-300"
              title={comment.content}
            >
              {comment.content}
            </td>
            <td className="p-2 dark:text-white">{comment.numberOfLikes}</td>
          </tr>
        )}
        viewAllLink={"/dashboard?tab=comments"}
      />
    </motion.div>
  );
};

export default Tables;

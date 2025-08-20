import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  HiOutlineUserGroup,
  HiDocumentText,
  HiOutlineAnnotation,
} from "react-icons/hi";
import { fetchUsers } from "../../redux/user/userSlice";
import { fetchPosts, fetchPostStats } from "../../redux/post/postSlice";
import { fetchAllComments } from "../../redux/comment/commentSlice";

import StatsCard from "./dash/StatsCard";
import Charts from "./dash/Charts";
import Tables from "./dash/Tables";
import DashboardSkeleton from "../skeleton/DashboardSkeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const DashInfo = () => {
  const dispatch = useDispatch();

  const {
    currentUser,
    users,
    totalUsers,
    lastMonthUsers,
    loading: usersLoading,
  } = useSelector((state) => state.user);
  const {
    posts,
    totalPosts,
    lastMonthPosts,
    loading: postsLoading,
    stats: postStats,
  } = useSelector((state) => state.post);
  const {
    allComments: comments,
    totalComments,
    lastMonthComments,
    loading: commentsLoading,
  } = useSelector((state) => state.comment);

  const loading = usersLoading || postsLoading || commentsLoading;

  useEffect(() => {
    const fetchData = () => {
      if (currentUser.role === "admin") {
        dispatch(fetchUsers({ limit: 5 }));
        dispatch(fetchPosts({ limit: 5 }));
        dispatch(fetchAllComments({ limit: 5 }));
        dispatch(fetchPostStats());
      }
    };
    fetchData();
  }, [currentUser, dispatch]);

  if (loading && (!users || !posts || !comments)) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StatsCard
          title="تعداد کل کاربران"
          value={totalUsers}
          itemVariants={itemVariants}
          monthlyValue={lastMonthUsers}
          icon={HiOutlineUserGroup}
          color="bg-orange-500"
        />
        <StatsCard
          title="تعداد کل مقاله ها"
          value={totalPosts}
          itemVariants={itemVariants}
          monthlyValue={lastMonthPosts}
          icon={HiDocumentText}
          color="bg-green-500"
        />
        <StatsCard
          title="تعداد کل دیدگاه‌ها"
          value={totalComments}
          itemVariants={itemVariants}
          monthlyValue={lastMonthComments}
          icon={HiOutlineAnnotation}
          color="bg-blue-500"
        />
      </motion.div>

      <Charts
        containerVariants={containerVariants}
        itemVariants={itemVariants}
        postStats={postStats}
      />

      <Tables
        containerVariants={containerVariants}
        itemVariants={itemVariants}
        postStats={postStats}
        users={users}
        posts={posts}
        comments={comments}
      />
    </div>
  );
};

export default DashInfo;

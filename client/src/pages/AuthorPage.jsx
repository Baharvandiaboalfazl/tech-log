import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchAuthorProfile,
  clearViewedProfile,
} from "../redux/user/userSlice";
import { FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";
import AuthorPageSkeleton from "../components/skeleton/AuthorPageSkeleton";
import ArticleCardGrid from "../components/articles/ArticleCardGrid";
import SocialLink from "../components/SocialLink";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const hoverVariants = {
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
};

const AuthorPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.user.viewedProfile
  );

  const author = data?.author;
  const posts = data?.posts;

  useEffect(() => {
    dispatch(fetchAuthorProfile(username));
    return () => {
      dispatch(clearViewedProfile());
    };
  }, [username, dispatch]);

  if (loading) return <AuthorPageSkeleton />;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!author) return <div className="text-center p-10">نویسنده یافت نشد.</div>;

  return (
    <motion.div
      className="bg-slate-100 dark:bg-slate-900 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto p-4 md:p-6">
        <main>
          <motion.section
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 text-center mt-20 bg-gradient-to-r from-blue-800 via-indigo-400 to-blue-800 rounded-t-2xl"
            variants={itemVariants}
          >
            <div className="relative flex flex-col items-center -mt-20">
              <motion.img
                className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg object-cover"
                src={author.avatar}
                alt={`پروفایل ${author.username}`}
                variants={hoverVariants}
                whileHover="hover"
              />
              <motion.h1
                className="text-3xl md:text-4xl font-bold mt-4 text-slate-900 dark:text-white"
                variants={itemVariants}
              >
                {author.username}
              </motion.h1>
              <motion.p
                className="text-gray-600 font-semibold mt-1"
                variants={itemVariants}
              >
                {author.role === "admin" ? "مدیر و نویسنده" : "نویسنده"}
              </motion.p>
              <motion.p
                className="text-white mt-4 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                {author.bio ||
                  "این نویسنده هنوز بیوگرافی خود را تکمیل نکرده است."}
              </motion.p>
              <div className="flex justify-center gap-4 mt-5">
                <SocialLink
                  href={author.socials?.twitter}
                  icon={FaTwitter}
                  label="Twitter"
                />
                <SocialLink
                  href={author.socials?.instagram}
                  icon={FaInstagram}
                  label="Instagram"
                  className="hover:bg-pink-500"
                />
                <SocialLink
                  href={author.socials?.telegram}
                  icon={FaTelegram}
                  label="Telegram"
                  className="hover:bg-blue-400"
                />
              </div>
            </div>
          </motion.section>

          <motion.section className="mt-12" variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              آخرین نوشته‌های {author.username}
            </h2>
            {posts && posts.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
              >
                {posts.map((post) => (
                  <ArticleCardGrid key={post._id} article={post} />
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-slate-500 py-10 bg-white dark:bg-slate-800 rounded-xl">
                این نویسنده هنوز پستی منتشر نکرده است.
              </p>
            )}
          </motion.section>
        </main>
      </div>
    </motion.div>
  );
};

export default AuthorPage;

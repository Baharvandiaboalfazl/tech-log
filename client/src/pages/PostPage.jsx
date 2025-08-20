import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CommentSection from "../components/comment/CommentSection";
import PostSkeleton from "../components/skeleton/PostSkeleton";

const apiUrl = import.meta.env.VITE_API_URL;

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
    },
  },
};

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `${apiUrl}/api/posts/getposts?slug=${postSlug}`
        );
        const data = await res.json();
        if (!res.ok || data.posts.length === 0) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) return <PostSkeleton />;

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-center p-10 bg-gray-50 dark:bg-slate-900">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-500 mb-4">خطا!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            متاسفانه در بارگذاری پست مشکلی پیش آمد. لطفاً اتصال خود را بررسی
            کرده و دوباره تلاش کنید.
          </p>
        </div>
      </div>
    );

  return (
    <main
      className="bg-gray-50 dark:bg-slate-900 py-10 px-4 min-h-screen"
      dir="rtl"
    >
      <AnimatePresence>
        {post && (
          <motion.article
            className="container mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <motion.header
                variants={itemVariants}
                className="col-span-2 flex flex-col items-center justify-center text-center mb-8 mt-10 lg:mt-0"
              >
                <Link
                  to={`/categories?cat=${post.category.slug}`}
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full hover:underline"
                >
                  {post.category.name}
                </Link>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-2 my-5">
                  <div className="w-11 h-11">
                    <img src={post.userId.avatar} alt={post.userId.username} />
                  </div>
                  <Link
                    to={`/author/${post.userId.username}`}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {post.userId.username}
                  </Link>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-4">
                  <span>
                    منتشر شده در
                    {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                  <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                  <span>
                    زمان مطالعه: حدود {(post.content.length / 1000).toFixed(0)}{" "}
                    دقیقه
                  </span>
                </div>
              </motion.header>

              <motion.figure variants={itemVariants} className="col-span-3 p-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full md:h-96 object-cover rounded-2xl shadow-2xl"
                />
              </motion.figure>
            </div>
            <div className="p-6 md:p-10">
              <motion.div
                variants={itemVariants}
                className="p-3 max-w-4xl mx-auto w-full post-content prose prose-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></motion.div>

              <motion.div
                variants={itemVariants}
                className="my-10 border-t border-gray-200 dark:border-gray-700"
              ></motion.div>

              {post.allowComments && (
                <motion.section
                  variants={itemVariants}
                  className="w-full max-w-3xl mx-auto"
                >
                  <CommentSection postId={post._id} />
                </motion.section>
              )}
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PostPage;

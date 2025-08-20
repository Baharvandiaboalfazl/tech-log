import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment-jalaali";
import { motion } from "framer-motion";
import { fetchPosts } from "../../redux/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import LastNewsSectionSkeleton from "../skeleton/LastNewsSectionSkeleton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const infoPanelVariants = {
  initial: { y: "100%" },
  hover: { y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } },
};

const arrowUpVariants = {
  initial: { opacity: 1 },
  hover: { opacity: 0, transition: { duration: 0.1 } },
};

const arrowDownVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.2, delay: 0.2 } },
};

const LastNewsSection = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);

  const [activeCard, setActiveCard] = useState(null);

  const { posts, loading } = useSelector((state) => state.post);

  const handleCardClick = (postId) => {
    setActiveCard(activeCard === postId ? null : postId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeCard &&
        sectionRef.current &&
        !sectionRef.current.contains(event.target)
      ) {
        setActiveCard(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeCard]);

  useEffect(() => {
    dispatch(fetchPosts({ limit: 4 }));
  }, [dispatch]);

  if (loading) {
    return <LastNewsSectionSkeleton />;
  }

  return (
    <div className="container mx-auto py-20" ref={sectionRef}>
      <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 dark:text-white mb-15">
        پست های اخیر
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post) => (
          <motion.div
            key={post._id}
            className="relative w-75 h-96 rounded-lg shadow-lg overflow-hidden cursor-pointer"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            animate={activeCard === post._id ? "hover" : "initial"}
            onClick={() => handleCardClick(post._id)}
          >
            <motion.img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
              variants={imageVariants}
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white"
              variants={arrowUpVariants}
            >
              <IoIosArrowUp size={30} />
            </motion.div>

            <motion.div
              className="absolute bottom-0 w-full h-36 bg-white/20 backdrop-blur-sm text-white p-4"
              variants={infoPanelVariants}
            >
              <motion.div
                className="absolute top-1 left-1/2 -translate-x-1/2 text-white"
                variants={arrowDownVariants}
              >
                <IoIosArrowDown size={25} />
              </motion.div>

              <div className="pt-4">
                <Link to={`/post/${post.slug}`}>
                  <h3 className="text-base font-semibold line-clamp-2 mb-1 hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-sm overflow-hidden line-clamp-1 opacity-80">
                    {post.content.replace(/<[^>]*>?/gm, "").substring(0, 100)}
                  </p>
                </Link>
                <div className="absolute flex items-center justify-between w-[calc(100%-2rem)] bottom-3 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.userId.avatar}
                      className="w-8 h-8 rounded-full object-cover"
                      alt={post.userId.username}
                    />
                    <Link
                      to={`/author/${post.userId.username}`}
                      className="text-xs font-medium hover:underline"
                    >
                      {post.userId.username}
                    </Link>
                  </div>
                  <p className="text-xs">
                    {moment(post.createdAt).format("jD jMMMM jYYYY")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LastNewsSection;

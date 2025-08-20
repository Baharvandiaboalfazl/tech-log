import { motion } from "framer-motion";
import CommentCard from "../home/CommentCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentByNum } from "../../redux/comment/commentSlice";
import CommentCardSkeleton from "../skeleton/CommentCardSkeleton";

const InfiniteComments = () => {
  const dispatch = useDispatch();

  const { commentByNum, loading } = useSelector((state) => state.comment);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(fetchCommentByNum(4));
  }, [dispatch]);

  useEffect(() => {
    if (commentByNum && commentByNum.length > 0) {
      setComments(commentByNum);
    }
  }, [commentByNum]);

  return (
    <section className="w-full py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-15">
          نظرات کاربران
        </h2>

        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-50 dark:from-gray-800 via-transparent to-gray-100 dark:to-transparent pointer-events-none"></div>

          <motion.div
            className="flex"
            animate={{
              x: ["0%", "50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {!loading ? (
              [...comments, ...comments].map((comment, index) => (
                <CommentCard
                  key={`${comment?._id}-${index}`}
                  comment={comment}
                />
              ))
            ) : (
              <>
                <CommentCardSkeleton />
                <CommentCardSkeleton />
                <CommentCardSkeleton />
                <CommentCardSkeleton />
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteComments;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart } from "react-icons/fi";

const iconVariants = {
  initial: {
    scale: 0,
    opacity: 0,
    rotate: -90,
  },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    rotate: 90,
    transition: {
      duration: 0.2,
    },
  },
};

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.button
      onClick={() => setIsLiked(!isLiked)}
      whileTap={{ scale: 0.9 }}
      className="relative w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer focus:outline-none"
    >
      <AnimatePresence mode="wait">
        {isLiked ? (
          <motion.div
            key="liked"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FiHeart size={36} className="text-red-500" fill="currentColor" />
          </motion.div>
        ) : (
          <motion.div
            key="unliked"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FiHeart size={36} className="text-slate-600 dark:text-gray-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default LikeButton;

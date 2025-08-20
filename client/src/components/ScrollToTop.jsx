import { motion } from "motion/react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute bottom-8 left-8 w-12 h-12 flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded-full"
    >
      <FaArrowUp />
    </motion.button>
  );
};

export default ScrollToTop;

import { motion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";
import { FaSlash } from "react-icons/fa";

const NoInstagramPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const wordVariants = {
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

  const text = "این شخص اینستاگرام ندارد";
  const words = text.split(" ");

  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative mb-8" variants={iconVariants}>
          <FiInstagram size={100} className="text-gray-300" />
          <FaSlash
            size={120}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 transform rotate-[-20deg]"
          />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-wider"
          variants={containerVariants}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-3"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default NoInstagramPage;

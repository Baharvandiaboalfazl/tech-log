import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiCursorClick, PiCursor } from "react-icons/pi";
import { cn } from "../lib/utils";

const ClickAnimation = ({ className }) => {
  const [isClick, setIsClick] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsClick((prev) => !prev);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cn("text-2xl text-slate-600 dark:text-white", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isClick ? "Click" : ""}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {isClick ? <PiCursor /> : <PiCursorClick />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ClickAnimation;

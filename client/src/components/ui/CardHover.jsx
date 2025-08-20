import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  const gradientColors = [
    "bg-gradient-to-r from-sky-400 to-blue-500",
    "bg-gradient-to-r from-blue-500 to-indigo-600",
    "bg-gradient-to-r from-cyan-400 to-teal-500",
    "bg-gradient-to-r from-blue-800 to-indigo-900",
    "bg-gradient-to-r from-slate-400 to-sky-600",
    "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, idx) => (
        <Link
          to={`/categories?cat=${item?.slug}`}
          target="_blank"
          key={idx}
          className="relative group block p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-300 dark:bg-slate-600/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className={gradientColors[idx % gradientColors.length]}>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </motion.div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl h-full w-full px-2 dark:bg-gray-900 bg-zinc-100 overflow-hidden border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 cursor-pointer",
        className
      )}
    >
      <div className="relative z-50">
        <div className="">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 dark:text-zinc-100 font-bold tracking-wide mt-4",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-200 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

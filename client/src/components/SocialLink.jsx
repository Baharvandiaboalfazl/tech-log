import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const SocialLink = ({ href, icon: Icon, label, className }) => {
  if (!href) return null;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "p-3 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors duration-300",
        className
      )}
      variants={itemVariants}
      whileHover={{ scale: 1.1, y: -2 }}
      aria-label={label}
    >
      <Icon size={20} />
    </motion.a>
  );
};

export default SocialLink;

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const useAnimatedCounter = (to) => {
  const count = useSpring(0, { duration: 1, stiffness: 100, damping: 30 });
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (typeof to === "number") {
      count.set(to);
    }
  }, [to, count]);

  return rounded;
};

const StatsCard = ({
  title,
  value,
  monthlyValue,
  icon: Icon,
  color,
  itemVariants,
}) => {
  const animatedValue = useAnimatedCounter(value || 0);

  return (
    <motion.div
      className={`p-6 rounded-xl shadow-lg text-white ${color} overflow-hidden relative`}
      variants={itemVariants}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white/90">{title}</h3>
          <motion.p className="text-4xl font-bold mt-2">
            {animatedValue}
          </motion.p>
          <p className="text-sm text-white/80 mt-1">
            {monthlyValue > 0 ? `+${monthlyValue}` : monthlyValue} در ماه اخیر
          </p>
        </div>
        <div className="p-3 bg-white/20 rounded-full">
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;

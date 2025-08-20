import { motion, useScroll } from "framer-motion";
import HeroSection from "../components/header/HeroSection";
import LastNewsSection from "../components/home/LastNewsSection";
import PostCardSection from "../components/home/PostCardSection";
import CategorySection from "../components/home/CategorySection";
import InfiniteComments from "../components/ui/InfiniteComments";
import NewsLetter from "../components/home/NewsLetter";
import State from "../components/home/State";

const Home = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left bg-blue-500 z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className=""
        >
          <HeroSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className=""
        >
          <State />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className=""
        >
          <CategorySection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <LastNewsSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <PostCardSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <InfiniteComments />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <NewsLetter />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CometCard from "../components/ui/CometCard";
import ClickAnimation from "../components/ClickAnimation";

const AboutPage = () => {
  return (
    <div className="py-10">
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        <CometCard className="flex items-center justify-center">
          <Link
            to="https://baharvandiaboalfazl.github.io/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className=" flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-gray-400 dark:bg-slate-800 p-2 md:p-4"
            style={{
              transformStyle: "preserve-3d",
              transform: "none",
              opacity: 1,
            }}
          >
            <div className="mx-2 flex-1">
              <div className="relative mt-2 aspect-[3/4] w-full">
                <img
                  className="absolute inset-0 h-full w-full rounded-xl object-cover"
                  src="https://s34.picofile.com/file/8486542392/bg.gif"
                />

                <img
                  src="https://s34.picofile.com/file/8486542376/me.png"
                  className="absolute h-full opacity-80"
                />
              </div>
            </div>
            <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 text-white">
              <div className="text-xs">ابوالفضل بهاروندی</div>
              <div className="text-xs text-gray-800 dark:text-gray-300 opacity-50">
                توسعه دهنده وب
              </div>
            </div>
          </Link>
        </CometCard>
        <p className="py-10">برای دیدن رزومه روی کارت بالا کلیک کنید</p>
        <ClickAnimation className="text-5xl" />
      </motion.div>
    </div>
  );
};

export default AboutPage;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LuMail, LuMailOpen } from "react-icons/lu";

const NewsLetter = () => {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setToggle((prev) => !prev);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 bg-gradient-to-r from-blue-800 via-cyan-600 to-sky-400 dark:from-gray-700 dark:via-zinc-900 dark:to-slate-700 bg-[size:400%_400%] relative overflow-hidden"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 10,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      <motion.div className="">
        {toggle ? (
          <LuMail className="text-white mx-auto mb-3" size={80} />
        ) : (
          <LuMailOpen className="text-white mx-auto mb-3" size={80} />
        )}
        <p className="text-2xl text-center text-white mb-8">
          جدیدترین مقالات را در ایمیل خود دریافت کنید
        </p>
        <div className="flex flex-row gap-4 max-w-md mx-auto px-2 sm:p-0">
          <input
            placeholder="ایمیل شما..."
            className="flex-grow h-10 outline-none bg-white/10 text-white rounded-lg"
          />
          <div class="relative group">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-lime-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative py-2 px-4 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6 hover:scale-105 active:scale-95">
              <button
                type="submit"
                className=" text-sm font-bold text-slate-600"
              >
                عضویت
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default NewsLetter;

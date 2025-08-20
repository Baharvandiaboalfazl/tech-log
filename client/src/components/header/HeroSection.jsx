import { useState, useEffect } from "react";
import Slides from "./Slides";

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 130) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div
      className={`h-screen rounded-b-[50px] transition-colors duration-1000 ease-in-out ${
        scrolled
          ? "bg-blue-100 dark:bg-slate-700"
          : "bg-slate-200 dark:bg-slate-900"
      }`}
    >
      <div className="flex flex-col w-full h-full">
        <Slides />
      </div>
    </div>
  );
};

export default HeroSection;

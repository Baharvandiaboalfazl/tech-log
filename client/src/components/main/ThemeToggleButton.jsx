import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext";
import { useState } from "react";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const iconClasses =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out";

  const showSun =
    (theme === "light" && !isHovered) || (theme === "dark" && isHovered);

  const showMoon =
    (theme === "dark" && !isHovered) || (theme === "light" && isHovered);

  return (
    <div
      className="relative w-12 h-12 rounded-full z-10 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <button
        className={`${iconClasses} ${
          showSun ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        aria-label="Toggle to Sun"
      >
        <FiSun size={24} className="text-yellow-500" />
      </button>

      <button
        className={`${iconClasses} ${
          showMoon ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        aria-label="Toggle to Moon"
      >
        <FiMoon size={24} className="text-blue-400" />
      </button>
    </div>
  );
};

export default ThemeToggleButton;

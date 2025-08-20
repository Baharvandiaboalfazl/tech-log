import { useState, useRef } from "react";
import { createPortal } from "react-dom";

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef(null);

  const handleMouseEnter = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - window.scrollY - 10,
        left: rect.left + rect.width / 2,
      });
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <span
      ref={targetRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible &&
        createPortal(
          <div
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: "translate(-50%, -100%)",
            }}
            className="fixed z-50 w-max max-w-xs
                     dark:bg-slate-800 dark:text-white bg-white text-zinc-700 text-sm text-center 
                     rounded-lg p-3 shadow-lg"
          >
            {content}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                        border-x-8 border-x-transparent
                        border-t-8 border-t-white dark:border-t-slate-800"
            ></div>
          </div>,
          document.body
        )}
    </span>
  );
};

export default Tooltip;

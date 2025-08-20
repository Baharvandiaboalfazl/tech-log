import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { LuTableOfContents } from "react-icons/lu";
import { useSelector } from "react-redux";

const Accordion = ({ children, title }) => {
  const { tab } = useSelector((state) => state.dashboard);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const contentTabs = ["posts", "users", "comments"];
    if (contentTabs.includes(tab)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [tab]);

  return (
    <div className="lg:w-full max-w-xs cursor-pointer">
      <div className="lg:border dark:border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center p-3 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
        >
          <div className="flex gap-3 items-center">
            <LuTableOfContents size={20} />
            <span>{title}</span>
          </div>
          <FiChevronDown
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-500 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2 py-3 px-2 bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

import { CiSearch } from "react-icons/ci";
import { FaBrain, FaLaptopCode, FaPython, FaReact } from "react-icons/fa";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { GrDatabase } from "react-icons/gr";
import { Link } from "react-router-dom";
import Tooltip from "../components/Tooltip";

const SearchInput = ({ inputValue, setInputValue }) => {
  return (
    <div className="relative dark:text-white flex items-center justify-center w-full py-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Link
          to="/categories?cat=هوش-مصنوعی"
          className="absolute top-1/4 left-[30%] text-5xl md:text-7xl text-gray-400 dark:text-gray-100 opacity-20 transform -translate-x-1/2 -translate-y-1/2 rotate-[-15deg]"
        >
          <Tooltip content="هوش مصنوعی">
            <FaBrain />
          </Tooltip>
        </Link>
        <Link
          to="/categories?cat=توسعه-وب"
          className="absolute top-[20%] right-[10%] text-6xl md:text-8xl text-gray-400 dark:text-gray-100 opacity-20 transform -translate-x-1/2 -translate-y-1/2 rotate-[10deg]"
        >
          <Tooltip content="توسعه وب">
            <FaLaptopCode />
          </Tooltip>
        </Link>
        <Link
          to="/categories?cat=زبان-های-برنامه-نویسی"
          className="absolute bottom-[15%] left-[25%] text-4xl md:text-6xl text-gray-400 dark:text-gray-100 opacity-20 transform -translate-x-1/2 -translate-y-1/2 rotate-[5deg]"
        >
          <Tooltip content="زبان های برنامه نویسی">
            <FaPython />
          </Tooltip>
        </Link>
        <Link
          to="/categories?cat=فرانت-اند"
          className="absolute bottom-[15%] right-[15%] text-5xl md:text-7xl text-gray-400 dark:text-gray-100 opacity-20 transform -translate-x-1/2 -translate-y-1/2 rotate-[-5deg]"
        >
          <Tooltip content="فرانت اند">
            <MdOutlineAutoFixHigh />
          </Tooltip>
        </Link>
        <Link
          to="/categories?cat=بک-اند"
          className="absolute top-[10%] left-[5%] text-4xl md:text-6xl text-gray-400 dark:text-gray-100 opacity-20 rotate-[20deg]"
        >
          <Tooltip content="بک اند">
            <GrDatabase />
          </Tooltip>
        </Link>
        <Link
          to="/categories?cat=فریم-ورک-ها-و-کتابخانه-ها"
          className="absolute bottom-[0] left-1/2 text-7xl md:text-8xl text-gray-400 dark:text-gray-100 opacity-20 transform -translate-x-1/2 -translate-y-1/2 rotate-[-20deg]"
        >
          <Tooltip content="فریم ورک ها و کتابخانه ها">
            <FaReact />
          </Tooltip>
        </Link>
      </div>

      <div className="relative w-full flex justify-center z-10">
        <div className="flex items-center">
          <CiSearch
            className="absolute mr-5 text-gray-600 dark:text-gray-300 pointer-events-none"
            size={30}
          />
        </div>
        <input
          type="text"
          placeholder="جستجو..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-gray-200 dark:bg-gray-600 text-lg w-8/10 md:w-5/10 h-16 rounded-full border-none outline-blue-500 !px-15"
        />
      </div>
    </div>
  );
};

export default SearchInput;

import { CiGrid41, CiGrid2H } from "react-icons/ci";

const FilterBar = ({
  view,
  setView,
  articles,
  filters,
  handleFilterChange,
  categories,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div className="text-right">
        <p className="text-2xl font-bold text-gray-600 dark:text-gray-200">
          {articles} مقاله یافت شد
        </p>
      </div>

      <div className="flex items-center gap-3">
        <select
          id="category"
          value={filters.category || ""}
          onChange={(e) => handleFilterChange("cat", e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200"
        >
          <option value="">همه دسته‌بندی‌ها</option>
          {categories.map((category) => (
            <option key={category._id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          id="sort"
          value={filters.sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200"
        >
          <option value="desc">جدیدترین</option>
          <option value="asc">قدیمی‌ترین</option>
        </select>

        <div className="flex items-center border border-gray-300 rounded-lg p-1 bg-gray-100 dark:bg-slate-700 dark:border-slate-600">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded-md transition-colors duration-200 ${
              view === "list"
                ? "bg-white dark:bg-slate-600 shadow-sm dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <CiGrid2H size={27} />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded-md transition-colors duration-200 ${
              view === "grid"
                ? "bg-white dark:bg-slate-600 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <CiGrid41 size={27} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

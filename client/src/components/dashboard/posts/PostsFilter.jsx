import { FiSearch } from "react-icons/fi";

const PostsFilter = ({ filters, handleFilterChange, categories }) => {
  return (
    <div className="p-6 border-b dark:border-slate-700">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:flex-grow">
          <FiSearch
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            id="searchTerm"
            placeholder="جستجو در عنوان یا نویسنده..."
            value={filters.searchTerm}
            onChange={handleFilterChange}
            className="h-10.5 w-full !px-10 border dark:text-gray-400 outline-none rounded-lg text-md"
          />
        </div>
        <select
          id="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="w-full sm:w-auto p-2 border rounded-lg text-sm dark:text-gray-400"
        >
          <option value="">همه دسته‌بندی‌ها</option>
          {categories.map((category) => (
            <option key={category._id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PostsFilter;

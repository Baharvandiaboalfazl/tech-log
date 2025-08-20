import { FiSearch } from "react-icons/fi";

const UsersFilter = ({ filters, handleFilterChange }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-t-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b dark:border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative w-full h-10 sm:flex-grow sm:col-span-3">
            <FiSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={23}
            />
            <input
              type="text"
              id="searchTerm"
              placeholder="جستجو..."
              value={filters.searchTerm}
              onChange={handleFilterChange}
              className="w-full h-full !pr-10 border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-700 dark:!text-white rounded-lg text-sm outline-none"
            />
          </div>
          <select
            id="role"
            value={filters.role}
            onChange={handleFilterChange}
            className="w-full sm:w-auto p-2 border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white rounded-lg text-sm outline-none"
          >
            <option value="all">همه نقش‌ها</option>
            <option value="admin">مدیر</option>
            <option value="editor">ویرایشگر</option>
            <option value="user">کاربر</option>
          </select>
          <select
            id="isVerified"
            value={filters.isVerified}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white outline-none"
          >
            <option value="all">وضعیت تایید</option>
            <option value="true">تایید شده</option>
            <option value="false">تایید نشده</option>
          </select>
          <select
            id="isBanned"
            value={filters.isBanned}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white outline-none"
          >
            <option value="all">وضعیت مسدودیت</option>
            <option value="true">مسدود شده</option>
            <option value="false">مسدود نشده</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UsersFilter;

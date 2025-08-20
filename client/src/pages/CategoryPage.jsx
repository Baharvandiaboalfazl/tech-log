import { usePostFilters } from "../hooks/usePostFilters";
import ArticlesPage from "../components/articles/ArticlesPage";

const CategoryPage = () => {
  const { handleFilterChange, filters, urlQueryString } = usePostFilters();

  const decodedURI = decodeURIComponent(urlQueryString);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-20">
        <main>
          <div className="mb-10 pb-10 border-b dark:border-gray-700">
            <h1 className="flex gap-2 text-3xl font-bold text-slate-900 dark:text-white">
              دسته‌بندی :
              <span className="text-blue-500 capitalize">
                {(decodedURI && decodedURI.split("=")[1].replace(/-/g, " ")) ||
                  "همه دسته بندی ها"}
              </span>
            </h1>
          </div>

          <ArticlesPage
            className="px-20"
            filters={filters}
            handleFilterChange={handleFilterChange}
            urlQueryString={urlQueryString}
          />
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;

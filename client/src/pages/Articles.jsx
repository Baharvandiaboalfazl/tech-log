import ArticlesPage from "../components/articles/ArticlesPage";
import SearchInput from "../components/SearchInput";
import { usePostFilters } from "../hooks/usePostFilters";

const Articles = () => {
  const {
    inputValue,
    setInputValue,
    handleFilterChange,
    urlQueryString,
    filters,
  } = usePostFilters();

  return (
    <main className="container mx-auto">
      <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
      <div className="py-20">
        <ArticlesPage
          filters={filters}
          handleFilterChange={handleFilterChange}
          urlQueryString={urlQueryString}
        />
      </div>
    </main>
  );
};

export default Articles;

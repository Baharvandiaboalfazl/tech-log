import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cn } from "../../lib/utils";
import { fetchCategories } from "../../redux/category/categorySlice";
import { fetchPosts } from "../../redux/post/postSlice";
import FilterBar from "./FilterBar";
import ArticleCardGrid from "./ArticleCardGrid";
import ArticleCardList from "./ArticleCardList";
import ArticleCardGridSkeleton from "../skeleton/ArticleCardGridSkeleton";
import ArticleCardListSkeleton from "../skeleton/ArticleCardListSkeleton";
import PaginationButtons from "../PaginationButtons";
import { useLocation, useNavigate } from "react-router-dom";

const ArticlesPage = ({
  className,
  filterBarVisibility = true,
  filters,
  handleFilterChange,
  urlQueryString,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { posts, loading, totalPosts } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const { settings } = useSelector((state) => state.settings);

  const [view, setView] = useState("grid");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log("در حال ارسال درخواست برای پست‌ها با کوئری:", urlQueryString);
    if (urlQueryString !== undefined) {
      dispatch(fetchPosts(urlQueryString));
    }
  }, [urlQueryString, dispatch]);

  const handlePageChange = (newStartIndex) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", newStartIndex);
    navigate(`${location.pathname}?${urlParams.toString()}`);
  };

  const usersPerPage = settings.rowsIndex || 9;

  const startIndex =
    parseInt(new URLSearchParams(urlQueryString).get("startIndex")) || 0;

  return (
    <div className="min-h-screen">
      <FilterBar
        view={view}
        setView={setView}
        articles={totalPosts}
        categories={categories}
        filters={filters}
        handleFilterChange={handleFilterChange}
        visible={filterBarVisibility}
      />
      <div
        className={cn(
          `transition-all duration-500 ${
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-6"
          }`,
          className
        )}
      >
        {posts.map((article) =>
          view === "grid" ? (
            loading ? (
              <ArticleCardGridSkeleton key={article.id} />
            ) : (
              <ArticleCardGrid key={article.id} article={article} />
            )
          ) : loading ? (
            <ArticleCardListSkeleton key={article.id} />
          ) : (
            <ArticleCardList key={article.id} article={article} />
          )
        )}
      </div>
      <PaginationButtons
        handlePageChange={handlePageChange}
        totalDataNumber={totalPosts}
        rowsIndex={usersPerPage}
        startIndex={startIndex}
      />
    </div>
  );
};

export default ArticlesPage;

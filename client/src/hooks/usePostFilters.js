import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";

export const usePostFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get("searchTerm") || ""
  );

  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("searchTerm", debouncedSearchTerm);
    } else {
      params.delete("searchTerm");
    }

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params);
    }
  }, [debouncedSearchTerm, searchParams, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    });
  };

  return {
    inputValue,
    setInputValue,
    handleFilterChange,
    urlQueryString: searchParams.toString(),
    filters: {
      searchTerm: searchParams.get("searchTerm") || "",
      sort: searchParams.get("sort") || "desc",
      category: searchParams.get("cat") || "",
    },
  };
};

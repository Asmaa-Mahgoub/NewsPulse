import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getSearchResult } from "../services/newsServices";
import ArticlesContianer from "../components/articles/ArticlesContianer";
import { useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";

function SearchResultPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { query } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchResult", query, currentPage],
    queryFn: () => getSearchResult({ query, currentPage }),
  });

  if (isLoading)
    return (
      <div className="relative h-80">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="relative h-80">
        <Error error={error} />
      </div>
    );

  return (
    <section className="py-8 px-2">
      <ArticlesContianer
        type="searchResult"
        keyWord={query}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}

export default SearchResultPage;

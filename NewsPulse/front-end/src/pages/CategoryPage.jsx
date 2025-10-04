import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCategoryArticles } from "../services/newsServices";
import ArticlesContianer from "../components/articles/ArticlesContianer";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useState } from "react";

function CategoryPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { category } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["category", category, currentPage],
    queryFn: () => getCategoryArticles({ category, currentPage }),
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
    <section className="py-8 px-4">
      <ArticlesContianer
        keyWord={category}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}

export default CategoryPage;

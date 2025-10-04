import { useState } from "react";
import List from "../List";

function ArticlesContianer({
  type = "category",
  keyWord,
  data,
  currentPage,
  setCurrentPage,
}) {
  const {
    page,
    articles,
    total_pages: totalPages,
    total_articles: totalArticles,
  } = data;

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="text-lg sm:text-xl md:text-3xl font-semibold border-b-2 py-2">
        {type === "category" ? (
          <h2>
            Discover <span className="third-color">{totalArticles}</span>{" "}
            articles from{" "}
            <span className="capitalize third-color">"{keyWord}"</span>
          </h2>
        ) : (
          <h2>
            🔎 Here are <span className="third-color">{totalArticles}</span>{" "}
            results for{" "}
            <span className="capitalize third-color">"{keyWord}"</span>
          </h2>
        )}
      </div>

      <List articles={articles} />

      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        <p className="text-gray-700">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </p>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default ArticlesContianer;

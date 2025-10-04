import { NavLink } from "react-router-dom";

import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Loading from "./Loading";
import ArticleHomeCard from "./articles/ArticleHomeCard";

function NewsBlock({ category, articles, isLoading, error }) {
  if (isLoading) return <Loading />;

  return (
    <section
      className={`w-full lg:w-[76%] ${category === "latest news" ? "border-2 rounded-md border-[var(--main-color)]" : ""}`}
    >
      <div
        className={`flex justify-between py-2 ${category === "latest news" ? "bg-[var(--third-color)] text-white rounded-md" : " border-b-2"} px-3`}
      >
        <h2 className={`text-2xl sm:text-3xl md:text-4xl uppercase font-bold`}>
          {category}
        </h2>

        <NavLink
          className={({ isActive }) =>
            `flex justify-center gap-2 text-lg font-semibold hover:text-black transition-colors duration-300`
          }
        >
          <span className="flex flex-col justify-center text-sm md:text-base">
            View All
          </span>

          <span className="flex flex-col justify-center text-base md:text-xl">
            <FaRegArrowAltCircleRight />
          </span>
        </NavLink>
      </div>

      <div
        className={`flex flex-wrap justify-evenly gap-2 py-4 bg-[var(--main-color)]`}
      >
        {articles.map((article) => (
          <ArticleHomeCard article={article} key={article} />
        ))}
      </div>
    </section>
  );
}

export default NewsBlock;

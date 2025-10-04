import { FaRegImage } from "react-icons/fa";

function ArticleHomeCard({ article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col min-h-[500px] rounded-md hover:bg-stone-100 transition-colors duration-300"
    >
      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-72 md:h-56 lg:h-64 object-cover rounded"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-64 md:h-56 lg:h-64 flex items-center justify-center bg-gray-200 text-gray-600 rounded">
          <FaRegImage size={48} />
        </div>
      )}

      <div className="p-4 flex flex-col justify-between flex-1">
        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
          {article.title}
        </h4>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 line-clamp-3">
          {article.description}
        </p>
        <div className="flex justify-between text-[10px] sm:text-xs md:text-sm text-gray-500">
          <span className="text-[var(--third-color)] font-bold">
            {article.source}
          </span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </a>
  );
}

export default ArticleHomeCard;

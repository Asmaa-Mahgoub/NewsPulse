import { NavLink } from "react-router-dom";

function ArticleItem({ article }) {
  return (
    <li>
      <NavLink
        to={`/adminpage/articlepage/${article.id}`}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0 p-4 border rounded-md shadow-sm hover:shadow-md transition-all"
      >
        {/* ==== Article Info ==== */}
        <div className="flex flex-col gap-2 md:max-w-[70%]">
          <span className="font-semibold text-base md:text-lg">
            {article.title}
          </span>
          <span className="text-sm text-gray-500">
            By {article.author} •{" "}
            {new Date(article.published_date).toLocaleDateString()}
          </span>
          <span className="text-sm text-gray-700 mt-1">
            Category:{" "}
            <span className="font-medium third-color">{article.category}</span>
          </span>
          <span className="text-sm text-gray-700">
            Tags:{" "}
            <span className="italic text-gray-600">
              {article.tags.split(",").join(", ")}
            </span>
          </span>
        </div>

        {/* ==== Actions ==== */}
        <div className="flex gap-2">
          <NavLink
            to={`/admin/articles/${article.id}/edit`}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </NavLink>
          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </NavLink>
    </li>
  );
}

export default ArticleItem;

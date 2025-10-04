import ArticleHomeCard from "./articles/ArticleHomeCard";

function ListItem({ article }) {
  return (
    <li className="w-full md:w-[48%] lg:w-[30%]">
      <ArticleHomeCard article={article} />
    </li>
  );
}

export default ListItem;

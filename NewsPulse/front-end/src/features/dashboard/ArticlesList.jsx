import ArticleItem from "./ArticleItem";

function ArticlesList({ articles }) {
  return (
    <ul className="p-4 space-y-4 bg-white rounded-md shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Articles</h3>

      {articles.map((article) => (
        <ArticleItem article={article} key={article.id} />
      ))}
    </ul>
  );
}

export default ArticlesList;

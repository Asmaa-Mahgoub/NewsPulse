import ListItem from "./ListItem";

function List({ articles }) {
  return (
    <ul className="flex flex-wrap justify-evenly gap-4">
      {articles.map((article, i) => (
        <ListItem article={article} key={i} />
      ))}
    </ul>
  );
}

export default List;

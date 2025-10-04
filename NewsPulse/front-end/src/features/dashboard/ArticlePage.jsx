import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleByID } from "../../services/dashboardServices";
import Button from "../../components/Button";

function ArticlePage() {
  const { articleID } = useParams();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", articleID],
    queryFn: () => getArticleByID({ articleID }),
  });

  const navigate = useNavigate();

  function onEdit() {
    navigate(`/adminpage/editarticle/${articleID}`);
  }

  function onDelete() {
    console.log("Delete");
  }

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        By {article.author} •{" "}
        {new Date(article.published_date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4">{article.content}</p>

      <div className="text-sm text-gray-600">
        <p>
          <strong>Category:</strong> {article.category}
        </p>
        <p>
          <strong>Tags:</strong> {article.tags}
        </p>
      </div>

      <div className=" mt-4 flex justify-between">
        <Button color="bg-stone-400" onClick={() => navigate(-1)}>
          Back
        </Button>
        <div className="flex gap-4">
          <Button color="bg-blue-500" onClick={onEdit}>
            Edit
          </Button>
          <Button color="bg-red-500" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;

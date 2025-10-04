import { useQuery } from "@tanstack/react-query";
import ArticlesList from "./ArticlesList";
import { getArticles } from "../../services/dashboardServices";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function ArticlesDashboard() {
  const { token } = useAuth();

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles", token],
    queryFn: () => getArticles(token),
  });

  const navigate = useNavigate();

  if (isLoading) return <p>Loading</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="py-2 ">
      <Button
        type="button"
        color="bg-green-600 hover:opacity-90 m-4"
        onClick={() => {
          navigate("/adminpage/addarticle");
        }}
      >
        ADD Article
      </Button>
      <ArticlesList articles={articles} />
    </div>
  );
}

export default ArticlesDashboard;

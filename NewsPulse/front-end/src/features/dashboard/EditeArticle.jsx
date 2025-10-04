import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getArticleByID } from "../../services/dashboardServices";
import Form from "../../components/Form";
import Button from "../../components/Button";

function EditArticle() {
  const { articleID } = useParams();
  const queryClient = useQueryClient();

  // fetch article
  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", articleID],
    queryFn: () => getArticleByID({ articleID }),
  });

  //state for control element
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // for store when article come
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        content: article.content,
      });
    }
  }, [article]);

  // handleChange
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // mutation for update
  // const mutation = useMutation({
  //   mutationFn: (updatedData) =>
  //     updateArticle({ articleID, data: updatedData }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["article", articleID]);
  //     console.log("Article updated successfully ✅");
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //     console.log("Error updating article ❌");
  //   },
  // });

  function handleSubmit(e) {
    e.preventDefault();
    // mutation.mutate(formData);
  }

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <Form handleSubmit={handleSubmit}>
      {/**title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-stone-300 rounded-lg px-3 py-2"
        />
      </div>

      {/* content */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full h-40 border border-stone-300 rounded-lg px-3 py-2"
        />
      </div>

      {/* <Button
        type="submit"
        color="bg-[var(--third-color)] hover:opacity-90"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Updating..." : "Update Article"}
      </Button> */}
    </Form>
  );
}

export default EditArticle;

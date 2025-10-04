import { useState } from "react";

function AddArticle() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
    author: "",
    tags: "",
    views: 0,
    file: null,
    mediaType: "",
  });

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    // هنا ممكن تستخدم mutation.mutate(formData)
  }

  return (
    <>
      <h2>Add Article</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg space-y-4"
      >
        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 h-32"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium">Author</label>
          <input
            type="text"
            name="tags"
            value={formData.author}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* File */}
        {/* <div>
          <label className="block font-medium">File</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div> */}

        {/* Media Type */}
        {/* <div>
          <label className="block font-medium">Media type</label>
          <select
            name="mediaType"
            value={formData.mediaType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select type</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div> */}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Add Article
        </button>
      </form>
    </>
  );
}

export default AddArticle;

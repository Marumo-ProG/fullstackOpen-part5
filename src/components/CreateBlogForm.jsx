import { useState } from "react";

// services
import blogService from "../services/blogs";

const CreateBlogForm = ({ setNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  // functions here
  const handleOnFormSubmit = async (e) => {
    e.preventDefault();

    // getting the values of the form from the form
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const author = formData.get("author");
    const url = formData.get("url");

    // posting the data to the service to create a new blog
    try {
      await blogService.create({
        title: title,
        author: author,
        url: url,
      });
      setNotification({ message: "Blog created!", color: "green" });
    } catch (error) {
      setNotification({ mesasge: "Error creating the blog!", color: "red" });
      alert("blog creation error");
    }
  };
  return (
    <div>
      <h4>Create a Blog Post</h4>
      <form onSubmit={handleOnFormSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;

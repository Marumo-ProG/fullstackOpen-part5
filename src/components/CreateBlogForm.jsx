import { useState } from "react";

// services
import blogService from "../services/blogs";

const CreateBlogForm = ({ setNotification, handleOnFormSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <h4>Create a Blog Post</h4>
      <form onSubmit={handleOnFormSubmit} id="createBlogForm">
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
        <button id="create-blog-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;

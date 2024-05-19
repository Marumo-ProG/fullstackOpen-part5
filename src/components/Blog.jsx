import { useState, useEffect } from "react";

import PropTypes from "prop-types";

// services
import blogsService from "../services/blogs";

const Blog = ({ blog, loggedUser, setNotification, user }) => {
  Blog.prototype = {
    blog: PropTypes.object.isRequired,
  };
  const [showBlogInfo, setShowBlogInfo] = useState(false);

  const handleOnRemove = async () => {
    try {
      if (window.confirm("Are you sure you want to remove " + blog.title)) {
        await blogsService.deleteBlog(blog.id);
        setNotification({ message: "Blog removed", color: "red" });
      }
    } catch (error) {
      alert("error deleting a blog post");
      console.log("error removing a blog");
    }
  };

  const handleLiking = async () => {
    // increase the blog likes by 1
    blog.likes = blog.likes + 1;

    // send the request to update to the backend
    try {
      await blogsService.update(blog.id, blog);
      setNotification({
        message: "Blog liked!",
        color: "green",
      });
    } catch (error) {
      alert("error liking the blog post");
      console.log(error);
    }
  };
  return (
    <li
      id="test1"
      style={{
        border: "2px solid black",
        marginTop: "16px",
        padding: "8px",
      }}
    >
      <span>
        {blog.title} {blog.author}{" "}
      </span>
      <button id="viewButton" onClick={() => setShowBlogInfo(!showBlogInfo)}>
        {showBlogInfo ? "hide blog information" : "view"}
      </button>
      <br />
      {showBlogInfo && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes}{" "}
            <button id={"like"} onClick={handleLiking}>
              like
            </button>
          </p>
          <p>{user && user.name}</p>
          <br />
          {loggedUser && user.username === loggedUser.username && (
            <button
              onClick={handleOnRemove}
              style={{ color: "white", backgroundColor: "red" }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </li>
  );
};

export default Blog;

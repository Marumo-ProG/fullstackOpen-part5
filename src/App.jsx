import { useState, useEffect } from "react";
import blogService from "./services/blogs";

// Components
import CreateBlogForm from "./components/createBlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    // removing the token from the local storage
    window.localStorage.removeItem("blogListUser");

    // changing the token from blogs service
    blogService.setToken(null);

    // changing the user
    setUser(null);
  };

  return (
    <div>
      <h1 style={{ color: "green" }}>Welcome to my Bloglist Application :-)</h1>
      {user ? (
        <>
          <h2>blogs</h2>
          <br />
          <h3>
            {user.name} has logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </h3>
          <CreateBlogForm />
          <br />
          <u>
            {blogs.map((blog) => (
              <li key={blog.id}>
                {blog.title} {blog.author}
              </li>
            ))}
          </u>
        </>
      ) : (
        <>
          <LoginForm setUser={setUser} />
        </>
      )}
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h1 style={{ color: "green" }}>Welcome to my Bloglist Application :-)</h1>
      {user ? (
        <>
          <h2>blogs</h2>
          <br />
          <h3>
            {user.name} has logged in <button>logout</button>
          </h3>
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

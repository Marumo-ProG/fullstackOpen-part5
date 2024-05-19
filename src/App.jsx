import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import usersService from "./services/users";

// Components
import CreateBlogForm from "./components/createBlogForm";
import LoginForm from "./components/LoginForm";
import NotificationMessage from "./components/NotificationMessage";
import Blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      let sortedBlogs = blogs.sort((a, b) => a.likes - b.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  const fetchUser = async (blog) => {
    try {
      if (blog.user) {
        const author = await usersService.getUser(blog.user);
        return author;
      }
    } catch (error) {
      alert("Error getting user");
    }
  };

  const handleLogout = () => {
    // removing the token from the local storage
    window.localStorage.removeItem("blogListUser");

    // changing the token from blogs service
    blogService.setToken(null);

    // changing the user
    setUser(null);
  };

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
      <h1 style={{ color: "green" }}>Welcome to my Bloglist Application :-)</h1>
      {notification && <NotificationMessage notification={notification} />}

      {user ? (
        <>
          <h2>blogs</h2>
          <br />
          <h3>
            {user.name} has logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </h3>
          {showBlogForm && (
            <CreateBlogForm
              setNotification={setNotification}
              handleOnFormSubmit={handleOnFormSubmit}
            />
          )}
          <br />
          <button
            id="create-blog-button"
            onClick={() => setShowBlogForm(!showBlogForm)}
          >
            {showBlogForm ? "cancel" : "create new blog"}
          </button>

          <br />
          <u>
            {blogs.map((blog) => (
              <Blog
                blog={blog}
                key={blog.id}
                loggedUser={user}
                setNotification={setNotification}
                user={() => fetchUser(blog)}
              />
            ))}
          </u>
        </>
      ) : (
        <>
          <LoginForm setUser={setUser} setNotification={setNotification} />
        </>
      )}
    </div>
  );
};

export default App;

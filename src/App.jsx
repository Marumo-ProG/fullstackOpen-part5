import { useState, useEffect } from "react";
import blogService from "./services/blogs";

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
			<h1 style={{ color: "green" }}>
				Welcome to my Bloglist Application :-)
			</h1>
			{notification && (
				<NotificationMessage notification={notification} />
			)}

			{user ? (
				<>
					<h2>blogs</h2>
					<br />
					<h3>
						{user.name} has logged in{" "}
						<button onClick={handleLogout}>logout</button>
					</h3>
					{showBlogForm && (
						<CreateBlogForm setNotification={setNotification} />
					)}
					<br />
					<button onClick={() => setShowBlogForm(!showBlogForm)}>
						{showBlogForm ? "cancel" : "create new blog"}
					</button>

					<br />
					<u>
						{blogs.map((blog) => (
							<Blog blog={blog} key={blog.id} />
						))}
					</u>
				</>
			) : (
				<>
					<LoginForm
						setUser={setUser}
						setNotification={setNotification}
					/>
				</>
			)}
		</div>
	);
};

export default App;

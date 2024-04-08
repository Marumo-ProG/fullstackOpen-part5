import { useState, useEffect } from "react";
import Blog from "./components/Blog";
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
			<h1 style={{ color: "green" }}>
				Welcome to my Bloglist Application :-)
			</h1>
			{user ? (
				<>
					<h2>blogs</h2>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			) : (
				<>
					<LoginForm setuser={setUser} />
				</>
			)}
		</div>
	);
};

export default App;

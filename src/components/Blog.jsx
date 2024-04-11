import { useState, useEffect } from "react";

import PropTypes from "prop-types";

// services
import blogsService from "../services/blogs";
import usersService from "../services/users";

const Blog = ({ blog, loggedUser }) => {
	Blog.prototype = {
		blog: PropTypes.object.isRequired,
	};
	const [showBlogInfo, setShowBlogInfo] = useState(false);
	const [user, setUser] = useState(null);

	// fetching the user information who created the post
	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		try {
			if (blog.user) {
				const user = await usersService.getUser(blog.user);
				setUser(user);
			}
		} catch (error) {
			alert("Error getting user");
		}
	};

	const handleOnRemove = async () => {
		try {
			if (
				window.confirm("Are you sure you want to remove " + blog.title)
			) {
				await blogsService.deleteBlog(blog.id);
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
		} catch (error) {
			alert("error liking the blog post");
			console.log(error);
		}
	};
	return (
		<div
			id="test1"
			style={{
				border: "2px solid black",
				marginTop: "16px",
				padding: "8px",
			}}
		>
			{blog.title} {blog.author}{" "}
			<button
				id="viewButton"
				onClick={() => setShowBlogInfo(!showBlogInfo)}
			>
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
		</div>
	);
};

export default Blog;

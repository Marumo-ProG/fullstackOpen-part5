import { useState } from "react";

// services
import blogsService from "../services/blogs";

const Blog = ({ blog }) => {
	const [showBlogInfo, setShowBlogInfo] = useState(false);

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
			style={{
				border: "2px solid black",
				marginTop: "16px",
				padding: "8px",
			}}
		>
			{blog.title} {blog.author}{" "}
			<button onClick={() => setShowBlogInfo(!showBlogInfo)}>
				{showBlogInfo ? "hide blog information" : "view"}
			</button>
			<br />
			{showBlogInfo && (
				<div>
					<p>{blog.url}</p>
					<p>
						{blog.likes}{" "}
						<button onClick={handleLiking}>like</button>
					</p>
					<p>{blog.author}</p>
				</div>
			)}
		</div>
	);
};

export default Blog;

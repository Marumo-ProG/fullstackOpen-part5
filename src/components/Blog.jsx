import { useState } from "react";

const Blog = ({ blog }) => {
	const [showBlogInfo, setShowBlogInfo] = useState(false);
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
						{blog.likes} <button>like</button>
					</p>
					<p>{blog.author}</p>
				</div>
			)}
		</div>
	);
};

export default Blog;

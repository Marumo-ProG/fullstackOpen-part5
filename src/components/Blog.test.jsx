import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
	const blog = {
		title: "boring test for number c",
		author: "Lenny",
		url: "www.suck.com",
		likes: 1,
		user: "6609081a30e454cff172c9c0",
	};

	const { container } = render(<Blog blog={blog} />);
	// screen.debug();

	const div = container.querySelector("#test1");
	expect(div).toHaveTextContent(blog.title);
	expect(div).toHaveTextContent(blog.author);
	expect(div).not.toHaveTextContent(blog.url);
	expect(div).not.toHaveTextContent(blog.likes);
});

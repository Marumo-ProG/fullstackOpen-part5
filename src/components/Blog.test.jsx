import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import CreateBlogForm from "./createBlogForm";

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

test("blogs information is shown when the view button is clicked", async () => {
  const blog = {
    title: "boring test for number c",
    author: "Lenny",
    url: "www.suck.com",
    likes: 1,
    user: "6609081a30e454cff172c9c0",
  };

  // const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} />);
  //   screen.debug();

  const div = container.querySelector("#test1");
  const viewButton = container.querySelector("#viewButton");

  // user setup
  const user = userEvent.setup();

  // make the user to click the button
  await user.click(viewButton);

  expect(div).toHaveTextContent(blog.title);
  expect(div).toHaveTextContent(blog.author);
  expect(div).toHaveTextContent(blog.url);
  expect(div).toHaveTextContent(blog.likes);
});

test("Like button handler clicked twice mock testing", async () => {
  const blog = {
    title: "boring test for number c",
    author: "Lenny",
    url: "www.suck.com",
    likes: 1,
    user: "6609081a30e454cff172c9c0",
  };

  const mockHandler = vi.fn();

  const { container } = render(<Blog blog={blog} />);
  screen.debug();

  const div = container.querySelector("#test1");
  const viewButton = container.querySelector("#viewButton");

  // user setup
  const user = userEvent.setup();

  // click the view button to display the rest of the information
  await user.click(viewButton);

  // getting the like button
  const likeButton = container.querySelector("#like");

  // adding the event hander to see how many times the user has clicked the button
  likeButton.onclick = mockHandler;

  // clicking the button twice
  await user.click(likeButton);
  await user.click(likeButton);

  // checking if the handler has been called twice
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("<CreateBlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(
    <CreateBlogForm handleOnFormSubmit={createBlog} />
  );

  const title = container.getElementsByTagName("input")[0];
  const author = container.getElementsByTagName("input")[1];
  const url = container.getElementsByTagName("input")[2];

  const sendButton = container.getElementsByTagName("button")[0];

  await user.type(
    title,
    "What they never told me as a second year computer science students!"
  );
  await user.type(author, "Samuel230");
  await user.type(url, "www.nick.org");

  await user.click(sendButton);

  console.log(createBlog.mock.calls);

  expect(createBlog.mock.calls).toHaveLength(1);
});

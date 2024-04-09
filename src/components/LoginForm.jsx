import { useState, useEffect } from "react";

// services
import loginService from "../services/loginService";
import blogs from "../services/blogs";

// // Configs
// import { setToken } from "../services/blogs";

const LoginForm = ({ setUser, setNotification }) => {
  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // checking if the user information is still in the state
    const user = window.localStorage.getItem("blogListUser");
    if (user) {
      setUser(JSON.parse(user));
      blogs.setToken(JSON.parse(user).token); // set the token
    }
  }, []);

  // functions
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    // here we have to make the post to the backend and see if the user exists
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });

      // set the user
      setUser(user);

      // set the token when the user logs in
      blogs.setToken(user.token);

      // clear the form
      setPassword("");
      setUsername("");

      // store the user information in the local storage
      window.localStorage.setItem("blogListUser", JSON.stringify(user));

      // setting the notification message
      setNotification({ message: "Logged in as " + user.name, color: "green" });
    } catch (error) {
      console.log("error loggin in", error);
      setNotification({ message: "Wrong password or username", color: "red" });
    }
  };
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name={"password"}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

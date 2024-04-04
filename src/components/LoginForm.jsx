import { useState } from "react";

const LoginForm = () => {
	// states
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// functions
	const handleFormSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const username = formData.get("username");
		const password = formData.get("password");

		// here we have to make the post to the backend and see if the user exists
		console.log("Username:", username);
		console.log("Password:", password);
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
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						name={"password"}
						type="password"
						id="password"
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

const LoginForm = () => {
	return (
		<div>
			<h3>Login</h3>
			<div>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" />
			</div>
			<br />
			<button type="submit">Login</button>
		</div>
	);
};

export default LoginForm;

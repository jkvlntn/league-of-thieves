import { useState } from "react";
import { Button, Input } from "../components/Form";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function submitLogin(e: React.FormEvent) {
		e.preventDefault();
		console.log("LOGGING IN ");
	}
	return (
		<div className="flex items-center justify-center h-screen w-screen bg-black/50">
			<form
				onSubmit={submitLogin}
				className="bg-gray-700 p-8 rounded text-white flex flex-col items-center justify-center gap-4"
			>
				<div className="text-xl">Staff Login</div>
				<Input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button variant="secondary" type="submit">
					Login
				</Button>
			</form>
		</div>
	);
}

export default Login;

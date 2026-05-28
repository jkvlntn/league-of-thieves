import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Button, Input } from "../components/Form";
import type { Authentication } from "@lot/common";
import toast from "react-hot-toast";
import { postRequest } from "../lib/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
	const [isLogin, setIsLogin] = useState(true);
	const { clearAuth } = useAuth();

	useEffect(() => {
		console.log("clearing auth");
		localStorage.clear();
		clearAuth();
	}, [clearAuth]);

	return (
		<div className="flex items-center justify-center h-screen w-screen bg-[#181a1b]">
			<div className="bg-gray-700 w-full max-w-sm p-8 rounded text-white flex flex-col items-center justify-center gap-4">
				<div className="text-xl">LoT Staff Panel</div>
				{isLogin ? <Login /> : <ActivatePage />}
				<div className="cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
					{isLogin
						? "First time here? Activate your account"
						: "Already have an account? Login"}
				</div>
			</div>
		</div>
	);
}

function ActivatePage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [activationCode, setActivationCode] = useState("");
	const [step1Completed, setStep1Completed] = useState(false);

	const navigate = useNavigate();

	async function submitActivate(e: React.FormEvent) {
		e.preventDefault();
		try {
			const response = await postRequest<Authentication>("/auth/activate", {
				username: username,
				password: password,
				activationCode: activationCode,
			});
			localStorage.setItem("authToken", response.data.token);
			navigate("/");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	function validateStep1() {
		return !!activationCode;
	}

	function validateStep2() {
		if (!username || !password || !confirmPassword) {
			return false;
		}
		return password === confirmPassword;
	}

	return (
		<form onSubmit={submitActivate} className="flex flex-col gap-4 w-full">
			{!step1Completed && (
				<>
					<Input
						type="text"
						placeholder="Activation Code"
						value={activationCode}
						onChange={(e) => setActivationCode(e.target.value)}
					/>
					<Button
						variant="secondary"
						type="button"
						disabled={!validateStep1()}
						onClick={() => setStep1Completed(true)}
					>
						Continue
					</Button>
				</>
			)}
			{step1Completed && (
				<>
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
					<Input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<div className="flex gap-2">
						<Button
							variant="secondary"
							type="button"
							onClick={() => setStep1Completed(false)}
						>
							Back
						</Button>

						<Button
							variant="secondary"
							type="submit"
							disabled={!validateStep2()}
							className="w-full"
						>
							Activate
						</Button>
					</div>
				</>
			)}
		</form>
	);
}

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	async function submitLogin(e: React.FormEvent) {
		e.preventDefault();
		try {
			const response = await postRequest<Authentication>("/auth/login", {
				username: username,
				password: password,
			});
			localStorage.setItem("authToken", response.data.token);
			navigate("/");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}
	return (
		<form onSubmit={submitLogin} className="flex flex-col gap-4 w-full">
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
	);
}

export default LoginPage;

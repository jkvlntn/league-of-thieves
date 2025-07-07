"use client";
import { login } from "@/actions/auth";
import { useState } from "react";
import Input from "@/components/form/Input";
import Button from "@/components/form/Button";
import Error from "@/components/form/Error";

export default function LoginForm() {
	const [error, setError] = useState("");

	async function submitForm(formData: FormData) {
		const { message } = await login(formData);
		setError(message);
	}

	return (
		<form className="flex flex-col gap-5 w-full max-w-lg" action={submitForm}>
			<Input type="password" name="password" placeholder="Password" />
			<div className="flex justify-center">
				<Button>Login</Button>
			</div>
			<Error>{error}</Error>
		</form>
	);
}

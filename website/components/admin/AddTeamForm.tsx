"use client";
import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import Error from "@/components/form/Error";
import Success from "@/components/form/Success";
import Link from "next/link";
import { addTeam } from "@/actions/team";
import { useState } from "react";

export default function AddTeamForm() {
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [motto, setMotto] = useState("");

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	async function submitForm(formData: FormData) {
		const result = await addTeam(formData);
		if (result.success) {
			setSuccess(result.message);
			setError("");
			setName("");
			setImage("");
			setMotto("");
		} else {
			setError(result.message);
			setSuccess("");
		}
	}

	return (
		<form className="flex flex-col gap-5 w-full max-w-lg" action={submitForm}>
			<Input
				type="text"
				name="name"
				placeholder="Team Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				type="text"
				name="image"
				placeholder="Image URL"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<Input
				type="text"
				name="motto"
				placeholder="Team Motto"
				value={motto}
				onChange={(e) => setMotto(e.target.value)}
			/>
			<Error>{error}</Error>
			<Success>{success}</Success>
			<div className="flex gap-5 justify-center">
				<Link href="/admin/teams">
					<Button type="button">Cancel</Button>
				</Link>
				<Button type="submit">Submit</Button>
			</div>
		</form>
	);
}

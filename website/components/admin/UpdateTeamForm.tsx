"use client";
import Input from "@/components/form/Input";
import Button from "@/components/form/Button";
import Error from "@/components/form/Error";
import Success from "@/components/form/Success";
import { useState } from "react";
import { updateTeam } from "@/actions/team";
import Link from "next/link";

interface Props {
	id: number;
	name: string;
	image: string;
	motto: string;
}

export default function EditTeamForm(props: Props) {
	const [name, setName] = useState(props.name);
	const [image, setImage] = useState(props.image);
	const [motto, setMotto] = useState(props.motto);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	async function handleUpdate(formData: FormData) {
		const result = await updateTeam(formData, props.id);
		if (result.success) {
			setSuccess(result.message);
			setError("");
		} else {
			setError(result.message);
			setSuccess("");
		}
	}

	return (
		<form className="flex flex-col gap-5 w-full max-w-lg" action={handleUpdate}>
			<Input
				type="text"
				name="name"
				placeholder="Team Name"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<Input
				type="text"
				name="image"
				placeholder="Image URL"
				value={image || ""}
				onChange={(e) => {
					setImage(e.target.value);
				}}
			/>
			<Input
				type="text"
				name="motto"
				placeholder="Team Motto"
				value={motto || ""}
				onChange={(e) => {
					setMotto(e.target.value);
				}}
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

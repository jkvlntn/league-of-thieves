"use client";
import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import Error from "@/components/form/Error";
import Success from "@/components/form/Success";
import Link from "next/link";
import { addPlayer } from "@/actions/player";
import { useState } from "react";

interface Props {
	teams: { id: number; name: string }[];
}

export default function AddPlayerForm({ teams }: Props) {
	const [username, setUsername] = useState("");
	const [image, setImage] = useState("");
	const [teamId, setTeamId] = useState("");
	const [priority, setPriority] = useState("");

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	async function submitForm(formData: FormData) {
		const result = await addPlayer(formData);
		if (result.success) {
			setSuccess(result.message);
			setError("");
			setUsername("");
			setImage("");
			setTeamId("");
			setPriority("");
		} else {
			setError(result.message);
			setSuccess("");
		}
	}

	return (
		<form className="flex flex-col gap-5 w-full max-w-lg" action={submitForm}>
			<Input
				type="text"
				name="username"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Input
				type="text"
				name="image"
				placeholder="Image URL"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<Select
				name="teamId"
				value={teamId}
				onChange={(e) => setTeamId(e.target.value)}
				placeholder="Select Team"
			>
				{teams.map((team) => (
					<option key={team.id} value={team.id}>
						{team.name}
					</option>
				))}
			</Select>
			<Input
				type="number"
				name="priority"
				placeholder="Priority (0-9)"
				value={priority}
				onChange={(e) => setPriority(e.target.value)}
			/>
			<Error>{error}</Error>
			<Success>{success}</Success>
			<div className="flex gap-5 justify-center">
				<Link href="/admin/players">
					<Button type="button">Cancel</Button>
				</Link>
				<Button type="submit">Submit</Button>
			</div>
		</form>
	);
}

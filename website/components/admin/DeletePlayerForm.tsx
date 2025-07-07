"use client";
import { useState, useEffect } from "react";
import { deletePlayer } from "@/actions/player";
import Button from "@/components/form/Button";
import Error from "@/components/form/Error";
interface Props {
	id: number;
}
export default function DeletePlayerForm({ id }: Props) {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [error, setError] = useState("");
	async function handleDelete() {
		if (!showConfirmation) {
			setShowConfirmation(true);
		} else {
			const result = await deletePlayer(id);
			setError(result.message);
		}
	}
	return (
		<div className="flex flex-col gap-5 w-full max-w-lg">
			{showConfirmation && (
				<div className="text-center">Click again to confirm deletion</div>
			)}
			<div className="flex justify-center">
				<Button onClick={handleDelete}>Delete Player</Button>
			</div>
			<Error>{error}</Error>
		</div>
	);
}

import db from "@/lib/database";
import AddPlayerForm from "@/components/admin/AddPlayerForm";

export default async function AddPlayerPage() {
	const teams = await db.team.findMany({
		select: {
			id: true,
			name: true,
		},
		orderBy: {
			name: "asc",
		},
	});
	return (
		<div className="min-h-[calc(100vh-9rem)] flex flex-col gap-5 items-center w-full">
			<div className="text-xl">Add Player</div>
			<AddPlayerForm teams={teams} />
		</div>
	);
}

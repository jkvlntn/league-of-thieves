import db from "@/lib/database";
import { redirect } from "next/navigation";
import UpdatePlayerForm from "@/components/admin/UpdatePlayerForm";
import DeletePlayerForm from "@/components/admin/DeletePlayerForm";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function UpdatePlayerPage({ params }: Props) {
	const id = parseInt((await params).id);
	if (isNaN(id)) {
		redirect("/admin/players");
	}
	const player = await db.player.findFirst({ where: { id: id } });
	if (!player) {
		redirect("/admin/players");
	}
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
			<div className="text-xl">Edit Player</div>
			<UpdatePlayerForm
				id={player.id}
				username={player.username}
				image={player.image || ""}
				teamId={player.teamId?.toString() || ""}
				priority={player.priority.toString()}
				teams={teams}
			/>
			<DeletePlayerForm id={player.id} />
		</div>
	);
}

import db from "@/lib/database";
import Button from "@/components/form/Button";
import Link from "next/link";
import PlayerCard from "@/components/admin/PlayerCard";

export default async function ManagePlayersPage() {
	const players = await db.player.findMany({
		select: {
			id: true,
			username: true,
			team: {
				select: {
					name: true,
				},
			},
		},
		orderBy: {
			username: "asc",
		},
	});

	return (
		<div className="min-h-[calc(100vh-9rem)]">
			<div className="flex justify-center gap-5">
				<Link href="/admin">
					<Button>Back</Button>
				</Link>
				<Link href="/admin/players/add">
					<Button>Add a New Player</Button>
				</Link>
			</div>
			<div className="mt-5 flex gap-5 flex-wrap justify-center">
				{players.map((player) => (
					<PlayerCard
						key={player.id}
						id={player.id}
						username={player.username}
						teamName={player.team?.name || "No Team"}
					/>
				))}
			</div>
		</div>
	);
}

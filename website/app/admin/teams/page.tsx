import TeamCard from "@/components/admin/TeamCard";
import db from "@/lib/database";
import Button from "@/components/form/Button";
import Link from "next/link";

export default async function ManageTeamsPage() {
	const teams = await db.team.findMany({
		select: {
			id: true,
			name: true,
			_count: {
				select: {
					players: true,
				},
			},
		},
		orderBy: {
			name: "asc",
		},
	});

	return (
		<div className="min-h-[calc(100vh-9rem)]">
			<div className="flex justify-center gap-5">
				<Link href="/admin">
					<Button>Back</Button>
				</Link>
				<Link href="/admin/teams/create">
					<Button>Add a New Team</Button>
				</Link>
			</div>
			<div className="mt-5 flex gap-5 flex-wrap justify-center">
				{teams.map((team) => (
					<TeamCard
						key={team.id}
						id={team.id}
						name={team.name}
						playerCount={team._count.players}
					/>
				))}
			</div>
		</div>
	);
}

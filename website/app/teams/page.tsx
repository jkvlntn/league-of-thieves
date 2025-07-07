import db from "@/lib/database";
import TeamBox from "@/components/teams/TeamBox";

export default async function TeamsPage() {
	const teams = await db.team.findMany({
		orderBy: {
			name: "asc",
		},
	});
	return (
		<div className="min-h-[calc(100vh-9rem)] ">
			<div className="flex justify-center flex-wrap gap-10">
				{teams.map((team) => (
					<TeamBox
						key={team.id}
						name={team.name}
						image={team.image || "/noimage.png"}
					/>
				))}
			</div>
		</div>
	);
}

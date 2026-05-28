"use client";
import { useEffect, useState } from "react";
import TeamBox from "@/components/teams/TeamBox";
import { apiGet } from "@/lib/requests";

interface Team {
	id: number;
	name: string;
	image: string | null;
}

export default function TeamsPageClient({ apiURL }: { apiURL: string }) {
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		apiGet<Team[]>("/teams", apiURL).then((res) => {
			setTeams(res.data);
			setLoading(false);
		});
	}, [apiURL]);

	return (
		<div className="min-h-[calc(100vh-9rem)] ">
			<div className="flex justify-center flex-wrap gap-10">
				{teams.map((team) => (
					<TeamBox
						key={team.id}
						name={team.name}
						image={team.image || "/images/noimage.png"}
					/>
				))}
			</div>
		</div>
	);
}

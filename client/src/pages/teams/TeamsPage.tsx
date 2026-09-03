import type { Team } from "@lot/common";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../../lib/api";
import PageError from "../../components/PageError";
import Loading from "../../components/Loading";

function TeamsPage() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		fetchTeams();
	}, []);

	async function fetchTeams() {
		try {
			const teams = await getRequest<Team[]>("/teams");
			setTeams(teams.data);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred");
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			{isLoading && (
				<div className="flex w-full flex-1 items-center justify-center">
					<Loading />
				</div>
			)}
			{!!error && (
				<div className="flex w-full flex-1 items-center justify-center">
					<PageError message={error} />
				</div>
			)}
			{!isLoading && !error && (
				<div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10 justify-items-center">
					{teams.map((team) => (
						<TeamBox key={team.id} team={team} />
					))}
				</div>
			)}
		</>
	);
}

function TeamBox({ team }: { team: Team }) {
	return (
		<Link
			to={`/teams/${team.slugName}`}
			className="flex w-full max-w-[220px] flex-col items-center gap-2 tranform transition-all hover:scale-105 cursor-pointer"
		>
			<div className="w-full aspect-square">
				<img src={team.image ?? ""} className="w-full object-contain" />
			</div>
			<div>{team.name}</div>
		</Link>
	);
}

export default TeamsPage;

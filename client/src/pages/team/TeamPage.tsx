import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../lib/api";
import type { TeamWithPlayers } from "@lot/common";
import PageError from "../../components/PageError";

function TeamPage() {
	const { teamName } = useParams<{ teamName: string }>();
	const [team, setTeam] = useState<TeamWithPlayers | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>("");
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
	const [rotationCount, setRotationCount] = useState(0);

	async function fetchTeams() {
		try {
			const teamResponse = await getRequest<TeamWithPlayers>(
				"/teams/name/" + teamName,
			);
			setTeam(teamResponse.data);
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

	useEffect(() => {
		fetchTeams();
	}, [teamName]);

	useEffect(() => {
		function handleResize() {
			setScreenWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setRotationCount((count) => count + 1);
		}, 5000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, []);

	function rotateList<T>(list: T[], r: number): T[] {
		const n = list.length;
		const rotatedList = new Array(n);
		for (let i = 0; i < n; i++) {
			rotatedList[(i + r) % n] = list[i];
		}
		return rotatedList;
	}

	const priorityOrder = [6, 4, 2, 0, 1, 3, 5, 7];

	const visiblePlayerCount = screenWidth < 640 ? 3 : screenWidth < 768 ? 5 : 8;
	const sortedPlayers = rotateList(
		team?.players.sort(
			(a, b) =>
				priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority),
		) || [],
		rotationCount,
	);

	const displayedPlayers = sortedPlayers.slice(
		Math.floor((sortedPlayers.length - visiblePlayerCount) / 2),
		Math.floor((sortedPlayers.length - visiblePlayerCount) / 2) +
			visiblePlayerCount,
	);

	// const availablePriortyOrder = priorityOrder.filter(
	// 	(p) => p < (team?.players.length || 0),
	// );

	// const rotatedPlayers = team?.players.map((player) => {
	// 	const priorityIndex =
	// 		(availablePriortyOrder.indexOf(player.priority) + selectedPlayerIndex) %
	// 		availablePriortyOrder.length;
	// 	return { ...player, priority: availablePriortyOrder[priorityIndex] };
	// });

	// const sortedPlayers =
	// 	rotatedPlayers?.sort((a, b) => a.priority - b.priority) || [];

	return (
		<>
			{isLoading && <div>Loading...</div>}
			{!isLoading && !!error && <PageError message={error} />}
			{!isLoading && !error && team && (
				<div className="flex flex-col items-center justify-center gap-5">
					<div className="text-center">
						<div className="text-6xl font-header bg-clip-text text-transparent bg-gradient-to-b from-[#F6AE64] to-[#41301E]">
							{team.name.toUpperCase()}
						</div>
						<div className="text-2xl font-motto">{team.motto}</div>
					</div>

					<div className="w-full flex justify-center">
						{displayedPlayers.map((p, i) => (
							<PlayerImage
								key={p.id}
								imageUrl={p.image}
								shift={
									i < (displayedPlayers.length - 1) / 2
										? "right"
										: i > (displayedPlayers.length - 1) / 2
											? "left"
											: undefined
								}
								overlapHeight={
									100 - Math.abs((displayedPlayers.length - 1) / 2 - i)
								}
								distance={
									Math.abs((displayedPlayers.length - 1) / 2 - i) === 0
										? "center"
										: Math.abs((displayedPlayers.length - 1) / 2 - i) === 1
											? "close"
											: "far"
								}
							/>
						))}
					</div>
					<div className="w-full flex flex-wrap justify-center gap-2 lg:gap-3 xl:gap-4 xl:text-lg">
						{displayedPlayers.map((p) => (
							<div key={p.id}>{p.username}</div>
						))}
					</div>
				</div>
			)}
		</>
	);
}

function PlayerImage({
	imageUrl,
	shift,
	overlapHeight,
	distance,
}: {
	imageUrl: string | null;
	shift?: "left" | "right";
	overlapHeight: number;
	distance: "center" | "close" | "far";
}) {
	return (
		<div
			className={`w-[199px] lg:w-[273px] xl:w-[344px] aspect-[5/7] ${shift === "left" ? "-ml-31 lg:-ml-43 xl:-ml-54" : shift === "right" ? "-mr-31 lg:-mr-43 xl:-mr-54" : ""}`}
			style={{ zIndex: overlapHeight }}
		>
			<img
				src={imageUrl ? imageUrl : "/default_player.png"}
				alt="Player"
				className={`w-full h-full object-contain ${distance === "close" ? "scale-90 opacity-75 brightness-80" : distance === "far" ? "scale-75 opacity-40 brightness-60 blur-[1px]" : ""}`}
			/>
		</div>
	);
}

export default TeamPage;

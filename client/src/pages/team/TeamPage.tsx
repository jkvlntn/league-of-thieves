import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../lib/api";
import type { TeamWithPlayers } from "@lot/common";
import PageError from "../../components/PageError";
import Loading from "../../components/Loading";

function TeamPage() {
	const { teamName } = useParams<{ teamName: string }>();
	const [team, setTeam] = useState<TeamWithPlayers | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>("");
	const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
	const [rotationCount, setRotationCount] = useState(0);
	const touchStartX = useRef<number | null>(null);

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

	function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
		touchStartX.current = event.touches[0]?.clientX ?? null;
	}

	function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
		if (touchStartX.current === null) return;

		const touchEndX = event.changedTouches[0]?.clientX;
		const swipeDistance =
			touchEndX === undefined ? 0 : touchEndX - touchStartX.current;
		touchStartX.current = null;

		if (Math.abs(swipeDistance) < 50) return;
		setRotationCount((count) => count + (swipeDistance < 0 ? -1 : 1));
	}

	function rotateList<T>(list: T[], r: number): T[] {
		const n = list.length;
		if (n === 0) return [];

		const rotation = ((r % n) + n) % n;
		const rotatedList = new Array(n);
		for (let i = 0; i < n; i++) {
			rotatedList[(i + rotation) % n] = list[i];
		}
		return rotatedList;
	}

	const priorityOrder = [6, 4, 2, 0, 1, 3, 5, 7];

	const visiblePlayerCount =
		screenWidth < 640
			? 3
			: screenWidth < 768
				? 5
				: Math.min(8, team?.players.length || 0);
	const sortedPlayers = rotateList(
		team?.players.sort(
			(a, b) =>
				priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority),
		) || [],
		screenWidth < 768 ? rotationCount : 0,
	);

	const displayedPlayers =
		screenWidth < 768
			? sortedPlayers.slice(
					Math.floor((sortedPlayers.length - visiblePlayerCount) / 2),
					Math.floor((sortedPlayers.length - visiblePlayerCount) / 2) +
						visiblePlayerCount,
				)
			: sortedPlayers;

	return (
		<div className="flex w-full flex-1 items-center justify-center">
			{isLoading && <Loading />}
			{!isLoading && !!error && <PageError message={error} />}
			{!isLoading && !error && team && (
				<div className="flex w-full flex-1 flex-col items-center justify-center gap-5">
					<div className="text-center">
						<div className="text-6xl font-header bg-clip-text text-transparent bg-gradient-to-b from-[#F6AE64] to-[#41301E]">
							{team.name.toUpperCase()}
						</div>
						<div className="text-2xl font-motto">{team.motto}</div>
					</div>

					<div
						className="w-full flex justify-center"
						onTouchStart={handleTouchStart}
						onTouchEnd={handleTouchEnd}
					>
						{displayedPlayers.map((p, i) => (
							<PlayerImage
								key={p.id}
								imageUrl={p.image}
								shift={
									i < Math.floor((displayedPlayers.length - 1) / 2)
										? "right"
										: i > Math.floor((displayedPlayers.length - 1) / 2)
											? "left"
											: undefined
								}
								overlapHeight={
									100 - Math.abs((displayedPlayers.length - 1) / 2 - i)
								}
								distance={
									screenWidth >= 768 ||
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
		</div>
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

import { useState, useEffect, useMemo } from "react";
import type { ScoreboardData } from "@lot/common";
import { getRequest } from "../../lib/api";
import Loading from "../../components/Loading";
import PageError from "../../components/PageError";
import { io } from "socket.io-client";

function getPlacementScore(placement: number) {
	switch (placement) {
		case 1:
			return 9;
		case 2:
			return 7;
		case 3:
			return 5;
		case 4:
			return 3;
		case 5:
			return 2;
		default:
			return 0;
	}
}

function ArenaPage() {
	const [scoreboard, setScoreboard] = useState<ScoreboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	async function fetchScoreboard() {
		try {
			const responseJson = await getRequest<ScoreboardData>("/scoreboard");
			setScoreboard(responseJson.data);
			setError("");
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred");
			}
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchScoreboard();
	}, []);

	useEffect(() => {
		const socket = io(`${import.meta.env.VITE_API_URL}`, {
			transports: ["websocket"],
		});

		socket.on("scoreboard", () => {
			fetchScoreboard();
		});

		window.addEventListener("focus", fetchScoreboard);

		return () => {
			window.removeEventListener("focus", fetchScoreboard);
			socket.off("scoreboard");
			socket.disconnect();
		};
	}, []);

	const grandTotals = useMemo(() => {
		if (!scoreboard) {
			return [];
		}

		const sortedTotals = Object.entries(
			scoreboard.rounds.reduce<Record<string, number>>((totals, round) => {
				Object.entries(round.placements).forEach(([color, placement]) => {
					totals[color] = (totals[color] ?? 0) + getPlacementScore(placement);
				});
				return totals;
			}, {}),
		).sort((first, second) => second[1] - first[1]);

		return sortedTotals.map(([color, points]) => ({
			color,
			points,
			place:
				points > 0
					? sortedTotals.filter(([, otherPoints]) => otherPoints > points)
							.length + 1
					: null,
		}));
	}, [scoreboard]);

	return (
		<div className="flex w-full flex-1 items-center justify-center">
			{loading && <Loading />}
			{!loading && !!error && <PageError message={error} />}
			{!loading && !error && scoreboard && (
				<div className="flex flex-col w-full items-center gap-12">
					<div className="text-6xl font-header bg-clip-text text-transparent bg-gradient-to-b from-[#F6AE64] to-[#41301E]">
						THE ARENA
					</div>
					<div className="flex w-full flex-col items-center gap-8 justify-center lg:flex-row lg:gap-10 xl:gap-12">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{scoreboard.rounds.map((round) => (
								<div key={round.roundNumber}>
									<div className="bg-gradient-to-b from-[#F6AE64] to-[#41301E] p-0.5">
										<table className="bg-[#111112]">
											<tr>
												<th className="border-b border-[#F6AE64] px-4 py-1 text-center">
													ROUND {round.roundNumber}
												</th>
												<th className="border-b border-l border-[#F6AE64] px-4 py-1 text-center">
													PLACE
												</th>
												<th className="border-b border-[#F6AE64] px-4 py-1 text-center">
													POINTS
												</th>
											</tr>
											{Object.entries(round.placements)
												.sort((first, second) => {
													if (first[1] === 0) return 1;
													if (second[1] === 0) return -1;
													return first[1] - second[1];
												})
												.map(([color, placement]) => (
													<tr key={color}>
														<td className="border-b border-[#F6AE64] px-6 py-1 text-center">
															<span className="hidden xl:inline">TEAM </span>
															{color}
														</td>
														<td className="border-b border-l border-[#F6AE64] px-4 py-1 text-center">
															{placement || "--"}
														</td>
														<td className="border-b border-[#F6AE64] px-4 py-1 text-center">
															{getPlacementScore(placement) || "--"}
														</td>
													</tr>
												))}
										</table>
									</div>
								</div>
							))}
						</div>
						<div className="flex items-center">
							<div className="bg-gradient-to-b from-[#F6AE64] to-[#41301E] p-0.5">
								<table className="bg-[#111112]">
									<tr>
										<th className="border-b border-[#F6AE64] px-4 py-1 text-center">
											GRAND TOTAL
										</th>
										<th className="border-b border-l border-[#F6AE64] px-4 py-1 text-center">
											PLACE
										</th>
										<th className="border-b border-[#F6AE64] px-4 py-1 text-center">
											POINTS
										</th>
									</tr>
									{grandTotals.map(({ color, points, place }) => (
										<tr key={color}>
											<td className="border-b border-[#F6AE64] px-6 py-1 text-center">
												<span className="hidden xl:inline">TEAM </span>
												{color}
											</td>
											<td className="border-b border-l border-[#F6AE64] px-4 py-1 text-center">
												{place ?? "--"}
											</td>
											<td className="border-b border-[#F6AE64] px-4 py-1 text-center">
												{points || "--"}
											</td>
										</tr>
									))}
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ArenaPage;

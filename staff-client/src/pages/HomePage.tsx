import type { Stats } from "@lot/common";
import { useEffect, useState } from "react";
import { getRequest } from "../lib/api";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

function HomePage() {
	const [stats, setStats] = useState<Stats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchStats();
		// eslint-disable-next-line
	}, []);

	async function fetchStats() {
		try {
			const stats = await getRequest<Stats>("/stats");
			setStats(stats.data);
			setLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<div className="text-3xl">Dashboard</div>
			<div className="h-full">
				{loading && <Loading />}
				{!loading && stats && (
					<div className="flex justify-center items-start gap-6 flex-wrap">
						<div className="min-w-xs max-w-md w-full bg-gray-700 border border-gray-300 rounded-lg p-6 flex flex-col gap-4 shadow-md">
							<div className="flex justify-between items-center mb-2">
								<span className="text-base font-semibold text-white">
									Players
								</span>
								<span className="text-2xl font-bold text-white">
									{stats.totalPlayers}
								</span>
							</div>
							<div className="flex flex-col gap-2">
								<div className="flex justify-between text-xs font-medium text-gray-100 mb-1">
									<span>On Teams</span>
									<span>
										{stats.playersOnTeams} / {stats.totalPlayers} (
										{stats.totalPlayers > 0
											? Math.round(
													(stats.playersOnTeams / stats.totalPlayers) * 100,
												)
											: 0}
										% )
									</span>
								</div>
								<div className="w-full h-3 bg-gray-800 rounded overflow-hidden">
									<div
										className="h-full bg-blue-500 transition-all duration-500"
										style={{
											width: `${stats.totalPlayers > 0 ? (stats.playersOnTeams / stats.totalPlayers) * 100 : 0}%`,
										}}
									></div>
								</div>
							</div>
						</div>

						<div className="min-w-xs max-w-md w-full bg-gray-700 border border-gray-300 rounded-lg p-6 flex flex-col gap-4 shadow-md">
							<div className="flex justify-between items-center mb-2">
								<span className="text-base font-semibold text-white">
									Teams
								</span>
								<span className="text-2xl font-bold text-white">
									{stats.totalTeams}
								</span>
							</div>
							<div className="flex flex-col gap-2">
								<span className="text-xs font-semibold text-gray-100 mb-1">
									Players per Team
								</span>
								<div className="flex flex-col gap-2">
									{(() => {
										const entries = Object.entries(
											stats.teamsByPlayerCount,
										).sort((a, b) => Number(a[0]) - Number(b[0]));
										const maxTeams = Math.max(...entries.map(([, n]) => n));
										return entries.map(([count, numTeams]) => (
											<div key={count} className="flex items-center gap-2">
												<span className="w-8 text-right text-xs font-medium text-gray-100">
													{count}
												</span>
												<div className="flex-1 h-4 bg-gray-800 rounded relative">
													<div
														className="h-4 bg-blue-500 rounded"
														style={{
															width: `${maxTeams > 0 ? (numTeams / maxTeams) * 100 : 0}%`,
														}}
													></div>
													<span className="absolute left-2 top-0 h-4 flex items-center text-xs font-medium text-white">
														{numTeams} team{numTeams !== 1 ? "s" : ""}
													</span>
												</div>
											</div>
										));
									})()}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default HomePage;

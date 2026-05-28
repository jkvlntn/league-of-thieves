import { Stats } from "@lot/common";
import { asyncHandler } from "../lib/request-handler";
import * as statsService from "../services/stats.service";

export const getStats = asyncHandler<Stats>(async (req, res, next) => {
	const [totalPlayers, playersOnTeams, totalTeams, teamsByPlayerCount] =
		await Promise.all([
			statsService.getTotalPlayers(),
			statsService.getPlayersOnTeams(),
			statsService.getTotalTeams(),
			statsService.getTeamsByPlayerCount(),
		]);

	return {
		message: "Stats retrieved successfully",
		status: 200,
		data: {
			totalPlayers,
			playersOnTeams,
			totalTeams,
			teamsByPlayerCount,
		},
	};
});

import { ScoreboardData, ScoreboardTeamColor } from "@lot/common";
import { asyncHandler } from "../lib/request-handler";
import * as scoreboardService from "../services/scoreboard-service";
import z from "zod";

export const getScoreboard = asyncHandler<ScoreboardData>(
	async (req, res, next) => {
		return {
			status: 200,
			message: "Successfully retrieved scoreboard",
			data: scoreboardService.getScoreboard(),
		};
	},
);

export const resetScoreboard = asyncHandler<void>(async (req, res, next) => {
	scoreboardService.resetScoreboard();
	return {
		data: undefined,
		status: 200,
		message: "Successfully reset scoreboard",
	};
});

export const setScoreboardScore = asyncHandler<void>(async (req, res, next) => {
	const scoreboardUpdateSchema = z.object({
		round: z.number().int().min(1).max(4),
		teamColor: z.enum(ScoreboardTeamColor),
		placement: z.number().int().min(0).max(5),
	});
	const { round, teamColor, placement } = scoreboardUpdateSchema.parse(
		req.body,
	);
	scoreboardService.setScoreboardPlacement(round, teamColor, placement);
	return {
		data: undefined,
		status: 200,
		message: "Successfully set scoreboard placement",
	};
});

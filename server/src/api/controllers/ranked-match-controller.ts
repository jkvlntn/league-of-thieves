import {
	RankedMatch,
	OpenRankedMatch,
	RankedMatchShipType,
	RankedMatchFormat,
	RankedMatchRegion,
	RankedMatchSettings,
} from "@lot/common";
import { asyncHandler } from "../lib/request-handler";
import { HttpError } from "../models/http-error";
import * as rankedMatchService from "../services/ranked-match-service";
import * as z from "zod";

export const getOpenMatches = asyncHandler<OpenRankedMatch[]>(
	async (req, res, next) => {
		const matches = await rankedMatchService.getOpenMatches();
		return {
			status: 200,
			message: "Open ranked matches retrieved successfully",
			data: matches,
		};
	},
);

export const getPendingMatches = asyncHandler<RankedMatch[]>(
	async (req, res, next) => {
		const matches = await rankedMatchService.getPendingRankedMatches();
		return {
			status: 200,
			message: "Imcomplete ranked matches retrieved successfully",
			data: matches,
		};
	},
);

export const getCompletedMatches = asyncHandler<RankedMatch[]>(
	async (req, res, next) => {
		const matches = await rankedMatchService.getCompletedRankedMatches();
		return {
			status: 200,
			message: "Completed ranked matches retrieved successfully",
			data: matches,
		};
	},
);

export const createRankedMatch = asyncHandler<OpenRankedMatch>(
	async (req, res, next) => {
		//fix this
		const id = 2;
		const rankedMatchSchema = z.object({
			shipType: z.enum(RankedMatchShipType),
			format: z.enum(RankedMatchFormat),
			region: z.enum(RankedMatchRegion),
			scheduledAt: z.coerce.date(),
		});
		const matchSettings = req.body;
		const validSettings = rankedMatchSchema.parse(matchSettings);
		const matchId = await rankedMatchService.createRankedMatch(
			id,
			validSettings,
		);
		const createdMatch = await rankedMatchService.getRankedMatch(matchId);
		if (!createdMatch) {
			throw new HttpError(500, "Failed to retrieve newly created ranked match");
		}
		return {
			status: 201,
			message: "Ranked match created successfully",
			data: createdMatch,
		};
	},
);

export const joinRankedMatch = asyncHandler<OpenRankedMatch>(
	async (req, res, next) => {
		//fix this
		const id = 2;
		const rankedMatchSchema = z.object({
			shipType: z.enum(RankedMatchShipType),
			format: z.enum(RankedMatchFormat),
			region: z.enum(RankedMatchRegion),
			scheduledAt: z.coerce.date(),
		});
		const matchSettings = req.body;
		const validSettings = rankedMatchSchema.parse(matchSettings);
		const matchId = await rankedMatchService.createRankedMatch(
			id,
			validSettings,
		);
		const createdMatch = await rankedMatchService.getRankedMatch(matchId);
		if (!createdMatch) {
			throw new HttpError(500, "Failed to retrieve newly created ranked match");
		}
		return {
			status: 201,
			message: "Ranked match created successfully",
			data: createdMatch,
		};
	},
);

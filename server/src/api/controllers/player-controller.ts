import { HttpError } from "../models/http-error";
import { asyncHandler } from "../lib/request-handler";
import * as z from "zod";
import * as playerService from "../services/player-service";
import { Player } from "@lot/common";
import { parseId } from "../../lib/utils";

export const getPlayers = asyncHandler<Player[]>(async (req, res, next) => {
	const players = await playerService.getAllPlayers();
	return {
		message: "Players retrieved successfully",
		status: 200,
		data: players,
	};
});

export const getPlayerById = asyncHandler<Player>(async (req, res, next) => {
	const playerId = parseId(req.params.id);
	const player = await playerService.getPlayer(playerId);
	if (!player) {
		throw new HttpError(404, "Player not found");
	}
	return {
		message: "Player retrieved successfully",
		status: 200,
		data: player,
	};
});

export const getPlayerByUsername = asyncHandler<Player>(
	async (req, res, next) => {
		const playerUsername = parseId(req.params.username);
		const player = await playerService.getPlayer(playerUsername);
		if (!player) {
			throw new HttpError(404, "Player not found");
		}
		return {
			message: "Player retrieved successfully",
			status: 200,
			data: player,
		};
	},
);

export const createPlayer = asyncHandler<Player>(async (req, res, next) => {
	const playerSchema = z.object({
		username: z.string().min(1),
		image: z.url("Image must be a url").nullable().optional(),
		teamId: z.coerce
			.number("Team ID must be a number")
			.int("Team ID must be an integer")
			.positive("Team ID must be positive")
			.nullable()
			.optional(),
		priority: z.coerce.number().min(0).max(7).optional(),
	});

	const validPlayerData = playerSchema.parse(req.body);
	const playerExists = await playerService.doesPlayerExist(
		validPlayerData.username,
	);
	if (playerExists) {
		throw new HttpError(400, "A player with this username already exists");
	}
	const newPlayerId = await playerService.createPlayer(validPlayerData);
	const newPlayer = await playerService.getPlayer(newPlayerId);
	if (!newPlayer) {
		throw new HttpError(500, "Failed to retrieve newly created player");
	}
	return {
		message: "Player created successfully",
		status: 201,
		data: newPlayer,
	};
});

export const deletePlayer = asyncHandler<void>(async (req, res, next) => {
	const playerId = parseId(req.params.id);
	const exists = await playerService.doesPlayerExist(playerId);
	if (!exists) {
		throw new HttpError(404, "Player not found");
	}
	await playerService.deletePlayer(playerId);
	return {
		message: "Player deleted successfully",
		status: 200,
		data: undefined,
	};
});

export const updatePlayer = asyncHandler<Player>(async (req, res, next) => {
	const playerSchema = z.object({
		username: z.string().min(1).optional(),
		image: z.url("Image must be a url").nullable().optional(),
		teamId: z.coerce
			.number("Team ID must be a number")
			.int("Team ID must be an integer")
			.positive("Team ID must be positive")
			.nullable()
			.optional(),
		priority: z.coerce.number().min(0).max(7).optional(),
	});

	const playerId = parseId(req.params.id);
	const exists = await playerService.doesPlayerExist(playerId);
	if (!exists) {
		throw new HttpError(404, "Player not found");
	}
	const validPlayerData = playerSchema.parse(req.body);

	if (validPlayerData.username !== undefined) {
		const playerWithSameUsernameExists = await playerService.doesPlayerExist(
			validPlayerData.username,
		);
		if (playerWithSameUsernameExists) {
			const existingPlayer = await playerService.getPlayer(
				validPlayerData.username,
			);
			if (existingPlayer && existingPlayer.id !== playerId) {
				throw new HttpError(400, "A player with this username already exists");
			}
		}
	}

	const updatedPlayerId = await playerService.updatePlayer(
		playerId,
		validPlayerData,
	);
	const updatedPlayer = await playerService.getPlayer(updatedPlayerId);
	if (!updatedPlayer) {
		throw new HttpError(500, "Failed to retrieve updated player");
	}
	return {
		message: "Player updated successfully",
		status: 200,
		data: updatedPlayer,
	};
});

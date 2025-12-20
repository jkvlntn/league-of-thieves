import { HttpError } from "../models/http-error";
import * as teamService from "../services/team-service";
import { asyncHandler } from "../lib/request-handler";
import { Team, TeamWithPlayers } from "@lot/common";
import z from "zod";
import { parseId, slugify } from "../../lib/utils";

export const getTeams = asyncHandler<Team[]>(async (req, res, next) => {
	const teams = await teamService.getAllTeams();
	return {
		message: "Teams retrieved successfully",
		status: 200,
		data: teams,
	};
});

export const getTeamById = asyncHandler<Team>(async (req, res, next) => {
	const teamId = parseId(req.params.id);
	const team = await teamService.getTeam(teamId);
	if (!team) {
		throw new HttpError(404, "Team not found");
	}
	return {
		message: "Team retrieved successfully",
		status: 200,
		data: team,
	};
});

export const getTeamBySlugName = asyncHandler<TeamWithPlayers>(
	async (req, res, next) => {
		const teamSlugName = req.params.slugName;
		const team = await teamService.getTeamWithPlayers(teamSlugName);
		if (!team) {
			throw new HttpError(404, "Team not found");
		}
		return {
			message: "Team retrieved successfully",
			status: 200,
			data: team,
		};
	}
);

export const createTeam = asyncHandler<Team>(async (req, res, next) => {
	const teamSchema = z.object({
		name: z.string().trim().min(1),
		image: z.url().nullable().optional(),
		motto: z.string().trim().max(100).nullable().optional(),
		discordRole: z.string().nullable().optional(),
	});
	const validTeamData = teamSchema.parse(req.body);
	const slugName = slugify(validTeamData.name);
	const teamExists = await teamService.doesTeamExist(slugName);
	if (teamExists) {
		throw new HttpError(400, "A team with this name already exists");
	}
	const newTeamId = await teamService.createTeam(validTeamData);
	const newTeam = await teamService.getTeam(newTeamId);
	if (!newTeam) {
		throw new HttpError(500, "Failed to retrieve newly created team");
	}
	return {
		message: "Team created successfully",
		status: 201,
		data: newTeam,
	};
});

export const deleteTeam = asyncHandler<void>(async (req, res, next) => {
	const teamId = parseId(req.params.id);
	const exists = await teamService.doesTeamExist(teamId);
	if (!exists) {
		throw new HttpError(404, "Team not found");
	}
	await teamService.deleteTeam(teamId);
	return {
		message: "Team deleted successfully",
		status: 200,
		data: undefined,
	};
});

export const updateTeam = asyncHandler<Team>(async (req, res, next) => {
	const teamSchema = z.object({
		name: z.string().trim().min(1).optional(),
		image: z.url().nullable().optional(),
		motto: z.string().trim().max(100).nullable().optional(),
		discordRole: z.string().nullable().optional(),
	});

	const teamId = parseId(req.params.id);
	const exists = await teamService.doesTeamExist(teamId);
	if (!exists) {
		throw new HttpError(404, "Team not found");
	}
	const validTeamData = teamSchema.parse(req.body);
	if (validTeamData.name !== undefined) {
		const slugName = slugify(validTeamData.name);
		const teamWithSameNameExists = await teamService.doesTeamExist(slugName);
		if (teamWithSameNameExists) {
			const existingTeam = await teamService.getTeam(slugName);
			if (existingTeam && existingTeam.id !== teamId) {
				throw new HttpError(400, "A team with this name already exists");
			}
		}
	}
	const updatedTeamId = await teamService.updateTeam(teamId, validTeamData);
	const updatedTeam = await teamService.getTeam(updatedTeamId);
	if (!updatedTeam) {
		throw new HttpError(500, "Failed to retrieve updated team");
	}
	return {
		message: "Team updated successfully",
		status: 200,
		data: updatedTeam,
	};
});

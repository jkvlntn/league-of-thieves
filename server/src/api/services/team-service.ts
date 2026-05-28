import { orm } from "../../lib/database";
import { Team, TeamWithPlayers } from "@lot/common";
import { slugify } from "../../lib/utils";

export async function getAllTeams(): Promise<Team[]> {
	const teamData = await orm.team.findMany({
		include: { _count: { select: { players: true } } },
	});
	return teamData.map((team) => {
		return {
			id: team.id,
			name: team.name,
			slugName: team.slugName,
			image: team.image,
			motto: team.motto,
			playerCount: team._count.players,
			sloopElo: team.sloopElo,
			galleonElo: team.galleonElo,
			discordRole: team.discordRole,
		};
	});
}

export async function getTeam(teamSlugName: string): Promise<Team | null>;
export async function getTeam(teamId: number): Promise<Team | null>;
export async function getTeam(
	identifier: number | string,
): Promise<Team | null> {
	const teamData =
		typeof identifier === "number"
			? await orm.team.findUnique({
					where: { id: identifier },
					include: { _count: { select: { players: true } } },
				})
			: await orm.team.findUnique({
					where: { slugName: identifier },
					include: { _count: { select: { players: true } } },
				});

	if (!teamData) {
		return null;
	}
	return {
		id: teamData.id,
		name: teamData.name,
		slugName: teamData.slugName,
		image: teamData.image,
		motto: teamData.motto,
		playerCount: teamData._count.players,
		sloopElo: teamData.sloopElo,
		galleonElo: teamData.galleonElo,
		discordRole: teamData.discordRole,
	};
}

export async function getTeamWithPlayers(
	teamSlugName: string,
): Promise<TeamWithPlayers | null>;
export async function getTeamWithPlayers(
	teamId: number,
): Promise<TeamWithPlayers | null>;
export async function getTeamWithPlayers(
	identifier: number | string,
): Promise<TeamWithPlayers | null> {
	const teamData =
		typeof identifier === "number"
			? await orm.team.findUnique({
					where: { id: identifier },
					include: { players: true, _count: { select: { players: true } } },
				})
			: await orm.team.findUnique({
					where: { slugName: identifier },
					include: { players: true, _count: { select: { players: true } } },
				});

	if (!teamData) {
		return null;
	}
	return {
		id: teamData.id,
		name: teamData.name,
		slugName: teamData.slugName,
		image: teamData.image,
		motto: teamData.motto,
		playerCount: teamData._count.players,
		sloopElo: teamData.sloopElo,
		galleonElo: teamData.galleonElo,
		discordRole: teamData.discordRole,
		players: teamData.players.map((player) => {
			return {
				id: player.id,
				username: player.username,
				image: player.image,
				teamId: player.teamId,
				teamName: teamData.name,
				priority: player.priority,
			};
		}),
	};
}

export async function doesTeamExist(teamId: number): Promise<boolean>;
export async function doesTeamExist(teamSlugName: string): Promise<boolean>;
export async function doesTeamExist(
	identifier: number | string,
): Promise<boolean> {
	const teamData =
		typeof identifier === "number"
			? await orm.team.findUnique({
					select: { id: true },
					where: { id: identifier },
				})
			: await orm.team.findUnique({
					select: { id: true },
					where: { slugName: identifier },
				});
	return !!teamData;
}

export async function createTeam(teamData: {
	name: string;
	image?: string | null;
	motto?: string | null;
	discordRole?: string | null;
}): Promise<number> {
	const newTeamData = await orm.team.create({
		data: {
			...teamData,
			slugName: slugify(teamData.name),
		},
	});
	return newTeamData.id;
}

export async function deleteTeam(teamId: number): Promise<void> {
	await orm.team.delete({
		where: { id: teamId },
	});
}

export async function updateTeam(
	teamId: number,
	teamData: {
		name?: string;
		image?: string | null;
		motto?: string | null;
		discordRole?: string | null;
	},
): Promise<number> {
	const updatedTeamData = await orm.team.update({
		where: { id: teamId },
		data: {
			...teamData,
			slugName:
				teamData.name !== undefined ? slugify(teamData.name) : undefined,
		},
	});
	return updatedTeamData.id;
}

import { Player } from "@lot/common";
import { orm } from "../../lib/database";

export async function getAllPlayers(): Promise<Player[]> {
	const playersData = await orm.player.findMany({
		include: { team: { select: { name: true } } },
		orderBy: { username: "asc" },
	});
	return playersData.map((player) => {
		return {
			id: player.id,
			username: player.username,
			image: player.image,
			teamId: player.teamId,
			teamName: player.team?.name || null,
			priority: player.priority,
		};
	});
}

export async function getPlayer(playerId: number): Promise<Player | null>;
export async function getPlayer(playerUsername: string): Promise<Player | null>;
export async function getPlayer(
	playerIdentifier: number | string,
): Promise<Player | null> {
	const playerData =
		typeof playerIdentifier === "number"
			? await orm.player.findUnique({
					where: { id: playerIdentifier },
					include: { team: { select: { name: true } } },
				})
			: await orm.player.findUnique({
					where: { username: playerIdentifier },
					include: { team: { select: { name: true } } },
				});
	if (!playerData) {
		return null;
	}
	return {
		id: playerData.id,
		username: playerData.username,
		image: playerData.image,
		teamId: playerData.teamId,
		teamName: playerData.team?.name || null,
		priority: playerData.priority,
	};
}

export async function doesPlayerExist(playerId: number): Promise<boolean>;
export async function doesPlayerExist(PlayerUsername: string): Promise<boolean>;
export async function doesPlayerExist(
	playerIdentifier: number | string,
): Promise<boolean> {
	const player =
		typeof playerIdentifier === "number"
			? await orm.player.findUnique({ where: { id: playerIdentifier } })
			: await orm.player.findUnique({ where: { username: playerIdentifier } });
	return !!player;
}

export async function createPlayer(playerData: {
	username: string;
	image?: string | null;
	teamId?: number | null;
	priority?: number;
}): Promise<number> {
	const newPlayerData = await orm.player.create({
		data: playerData,
	});
	return newPlayerData.id;
}

export async function updatePlayer(
	playerId: number,
	playerData: {
		username?: string;
		image?: string | null;
		teamId?: number | null;
		priority?: number;
	},
): Promise<number> {
	const updatedPlayerData = await orm.player.update({
		where: { id: playerId },
		data: playerData,
	});
	return updatedPlayerData.id;
}

export async function deletePlayer(playerId: number): Promise<void> {
	await orm.player.delete({
		where: { id: playerId },
	});
}

import { orm } from "../../lib/database";

export async function getTotalPlayers() {
	return await orm.player.count();
}

export async function getPlayersOnTeams() {
	return await orm.player.count({
		where: {
			teamId: {
				not: null,
			},
		},
	});
}

export async function getTotalTeams() {
	return await orm.team.count();
}

export async function getTeamsByPlayerCount() {
	const teams = await orm.team.findMany({
		select: { _count: { select: { players: true } } },
	});
	const teamCounts = teams.map((team) => team._count.players);
	return teamCounts.reduce(
		(acc, count) => {
			acc[count] = (acc[count] || 0) + 1;
			return acc;
		},
		{} as Record<number, number>,
	);
}

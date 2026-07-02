import {
	OpenRankedMatch,
	RankedMatch,
	RankedMatchFormat,
	RankedMatchRegion,
	RankedMatchSettings,
	RankedMatchShipType,
	RankedMatchStatus,
} from "@lot/common";
import { orm } from "../../lib/database";

export async function getOpenMatches(): Promise<OpenRankedMatch[]> {
	const matches = await orm.rankedMatch.findMany({
		select: {
			id: true,
			status: true,
			shipType: true,
			format: true,
			region: true,
			scheduledAt: true,
		},
		where: { status: RankedMatchStatus.OPEN },
		orderBy: { scheduledAt: "asc" },
	});
	return matches.map((match) => ({
		id: match.id,
		status: match.status as RankedMatchStatus,
		settings: {
			shipType: match.shipType as RankedMatchShipType,
			format: match.format as RankedMatchFormat,
			region: match.region as RankedMatchRegion,
			scheduledAt: match.scheduledAt,
		},
	}));
}

export async function getCompletedRankedMatches(): Promise<RankedMatch[]> {
	const matches = await orm.rankedMatch.findMany({
		where: { status: RankedMatchStatus.COMPLETED },
		orderBy: { scheduledAt: "asc" },
		include: {
			creatorTeam: {
				select: { id: true, name: true, slugName: true, image: true },
			},
			joinerTeam: {
				select: { id: true, name: true, slugName: true, image: true },
			},
			winnerTeam: {
				select: { id: true, name: true, slugName: true, image: true },
			},
		},
	});
	return matches.map((match) => ({
		id: match.id,
		status: match.status as RankedMatchStatus,
		settings: {
			shipType: match.shipType as RankedMatchShipType,
			format: match.format as RankedMatchFormat,
			region: match.region as RankedMatchRegion,
			scheduledAt: match.scheduledAt,
		},
		creatorTeam: match.creatorTeam,
		joinerTeam: match.joinerTeam,
		winnerTeam: match.winnerTeam,
	}));
}

export async function getPendingRankedMatches(): Promise<RankedMatch[]> {
	const matches = await orm.rankedMatch.findMany({
		where: { status: RankedMatchStatus.PENDING },
		orderBy: { scheduledAt: "asc" },
		include: {
			creatorTeam: {
				select: { id: true, name: true, slugName: true, image: true },
			},
			joinerTeam: {
				select: { id: true, name: true, slugName: true, image: true },
			},
			winnerTeam: {
				select: { id: true, name: true, slugName: true, image: true },
			},
		},
	});
	return matches.map((match) => ({
		id: match.id,
		status: match.status as RankedMatchStatus,
		settings: {
			shipType: match.shipType as RankedMatchShipType,
			format: match.format as RankedMatchFormat,
			region: match.region as RankedMatchRegion,
			scheduledAt: match.scheduledAt,
		},
		creatorTeam: match.creatorTeam,
		joinerTeam: match.joinerTeam,
		winnerTeam: match.winnerTeam,
	}));
}

export async function getRankedMatch(
	matchId: number,
): Promise<OpenRankedMatch | RankedMatch | null> {
	const matchData = await orm.rankedMatch.findFirst({
		where: { id: matchId },
		include: {
			creatorTeam: {
				select: { id: true, name: true, slugName: true, image: true },
			},
			joinerTeam: {
				select: { id: true, name: true, slugName: true, image: true },
			},
			winnerTeam: {
				select: { id: true, name: true, slugName: true, image: true },
			},
		},
	});
	if (!matchData) {
		return null;
	}
	const matchSettings = {
		shipType: matchData.shipType as RankedMatchShipType,
		format: matchData.format as RankedMatchFormat,
		region: matchData.region as RankedMatchRegion,
		scheduledAt: matchData.scheduledAt,
	};
	if (matchData.status === RankedMatchStatus.OPEN) {
		return {
			id: matchData.id,
			status: matchData.status as RankedMatchStatus,
			settings: matchSettings,
		};
	}
	return {
		id: matchData.id,
		status: matchData.status as RankedMatchStatus,
		settings: matchSettings,
		creatorTeam: matchData.creatorTeam,
		joinerTeam: matchData.joinerTeam,
		winnerTeam: matchData.winnerTeam,
	};
}

export async function createRankedMatch(
	creatorTeamId: number,
	settings: RankedMatchSettings,
): Promise<number> {
	const newMatch = await orm.rankedMatch.create({
		data: {
			creatorTeamId,
			status: RankedMatchStatus.OPEN,
			shipType: settings.shipType,
			format: settings.format,
			region: settings.region,
			scheduledAt: settings.scheduledAt,
		},
	});
	return newMatch.id;
}

export async function deleteRankedMatch(matchId: number): Promise<void> {
	await orm.rankedMatch.delete({
		where: { id: matchId, status: RankedMatchStatus.OPEN },
	});
}

export async function joinRankedMatch(
	matchId: number,
	joinerTeamId: number,
): Promise<void> {
	await orm.rankedMatch.update({
		where: { id: matchId, status: RankedMatchStatus.OPEN },
		data: { joinerTeamId, status: RankedMatchStatus.PENDING },
	});
}

export async function completeRankedMatch(
	matchId: number,
	winnerTeamId: number,
): Promise<void> {
	await orm.rankedMatch.update({
		where: { id: matchId, status: RankedMatchStatus.PENDING },
		data: { winnerTeamId, status: RankedMatchStatus.COMPLETED },
	});
}

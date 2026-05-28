import { Player } from "./player";

export interface Team {
	id: number;
	name: string;
	image: string | null;
	slugName: string;
	motto: string | null;
	discordRole: string | null;
	galleonElo: number;
	sloopElo: number;
	playerCount: number;
}

export interface TeamWithPlayers extends Team {
	players: Player[];
}

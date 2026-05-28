export interface Stats {
	totalPlayers: number;
	playersOnTeams: number;
	totalTeams: number;
	teamsByPlayerCount: Record<number, number>;
}

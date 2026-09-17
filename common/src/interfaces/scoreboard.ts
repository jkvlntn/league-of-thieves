import { ScoreboardTeamColor } from "../enums/scoreboard-team-color";

export interface ScoreboardData {
	numberOfRounds: number;
	rounds: ScoreboardRound[];
}

export interface ScoreboardRound {
	roundNumber: number;
	placements: Record<ScoreboardTeamColor, number>;
}

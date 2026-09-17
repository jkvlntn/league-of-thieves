import { ScoreboardTeamColor } from "@lot/common";

export default class Scoreboard {
	static readonly DEFAULT_NUM_ROUNDS = 4;
	rounds: Record<ScoreboardTeamColor, number>[];

	constructor() {
		this.rounds = Array.from({ length: Scoreboard.DEFAULT_NUM_ROUNDS }, () =>
			this.createBlankRound(),
		);
	}

	getNumberOfRounds() {
		return this.rounds.length;
	}

	getRoundPlacements() {
		return this.rounds;
	}

	setPlacement(
		round: number,
		teamColor: ScoreboardTeamColor,
		placement: number,
	) {
		this.rounds[round - 1][teamColor] = placement;
	}

	reset() {
		this.rounds = Array.from({ length: this.getNumberOfRounds() }, () =>
			this.createBlankRound(),
		);
	}

	private createBlankRound() {
		return Object.fromEntries(
			Object.values(ScoreboardTeamColor).map((team) => [team, 0]),
		) as Record<ScoreboardTeamColor, number>;
	}
}

import { ScoreboardTeamColor, ScoreboardData } from "@lot/common";
import Scoreboard from "../models/scoreboard";
import * as socketService from "./socket-service";

const scoreboard = new Scoreboard();

export function getScoreboard(): ScoreboardData {
	return {
		numberOfRounds: scoreboard.getNumberOfRounds(),
		rounds: scoreboard.getRoundPlacements().map((roundPlacements, i) => ({
			roundNumber: i + 1,
			placements: roundPlacements,
		})),
	};
}

export function setScoreboardPlacement(
	round: number,
	teamColor: ScoreboardTeamColor,
	placement: number,
) {
	scoreboard.setPlacement(round, teamColor, placement);
	socketService.emit("scoreboard");
}

export function resetScoreboard() {
	scoreboard.reset();
	socketService.emit("scoreboard");
}

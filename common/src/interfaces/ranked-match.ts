import { RankedMatchShipType } from "../enums/ranked-match-ship-type";
import { RankedMatchFormat } from "../enums/ranked-match-format";
import { RankedMatchRegion } from "../enums/ranked-match-region";
import { RankedMatchStatus } from "../enums/ranked-match-status";
import { RankedMatchWinner } from "../enums/ranked-match-winner";
import { BasicTeam } from "./team";

export interface RankedMatchSettings {
	shipType: RankedMatchShipType;
	format: RankedMatchFormat;
	region: RankedMatchRegion;
	scheduledAt: Date;
}

export interface OpenRankedMatch {
	id: number;
	status: RankedMatchStatus;
	settings: RankedMatchSettings;
}

export interface RankedMatch extends OpenRankedMatch {
	id: number;
	status: RankedMatchStatus;
	settings: RankedMatchSettings;
	creatorTeam: BasicTeam;
	joinerTeam: BasicTeam | null;
	winnerTeam: BasicTeam | null;
}

import { ScoreboardTeamColor } from "@lot/common";
import type { ScoreboardData } from "@lot/common";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getRequest, postRequest } from "../lib/api";
import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableHeaderCell,
} from "./Table";
import { Button, Input } from "./Form";
import Loading from "./Loading";
import toast from "react-hot-toast";

const teamColorTextClasses: Record<ScoreboardTeamColor, string> = {
	[ScoreboardTeamColor.BLUE]: "text-blue-400",
	[ScoreboardTeamColor.WHITE]: "text-gray-300",
	[ScoreboardTeamColor.GREEN]: "text-green-400",
	[ScoreboardTeamColor.RED]: "text-red-400",
	[ScoreboardTeamColor.GOLD]: "text-yellow-400",
};

function toTitleCase(value: string) {
	return value.charAt(0) + value.slice(1).toLowerCase();
}

type EditingCell = { round: number; teamColor: ScoreboardTeamColor };

export function Scoreboard() {
	const [scoreboard, setScoreboard] = useState<ScoreboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
	const [draftValue, setDraftValue] = useState("");

	async function syncScoreboard() {
		try {
			const responseJson = await getRequest<ScoreboardData>("/scoreboard");
			setScoreboard(responseJson.data);
			setLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred");
			}
		}
	}

	useEffect(() => {
		syncScoreboard();
	}, []);

	useEffect(() => {
		const socket = io(`${import.meta.env.VITE_API_URL}`, {
			transports: ["websocket"],
		});

		socket.on("scoreboard", () => {
			syncScoreboard();
		});

		window.addEventListener("focus", syncScoreboard);

		return () => {
			window.removeEventListener("focus", syncScoreboard);
			socket.off("scoreboard");
			socket.disconnect();
		};
	}, []);

	function startEditing(
		round: number,
		teamColor: ScoreboardTeamColor,
		currentValue: number,
	) {
		setEditingCell({ round, teamColor });
		setDraftValue(String(currentValue));
	}

	async function commitEdit() {
		if (!editingCell || !scoreboard) {
			return;
		}

		const { round, teamColor } = editingCell;
		const placement = Number(draftValue) || 0;
		setEditingCell(null);

		setScoreboard({
			...scoreboard,
			rounds: scoreboard.rounds.map((r) =>
				r.roundNumber === round
					? { ...r, placements: { ...r.placements, [teamColor]: placement } }
					: r,
			),
		});

		try {
			await postRequest<void>("/scoreboard/set", {
				round,
				teamColor,
				placement,
			});
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred");
			}
			syncScoreboard();
		}
	}

	async function resetScoreboard() {
		try {
			await postRequest<void>("/scoreboard/reset");
			toast.success("Scoreboard reset");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred");
			}
		}
	}

	if (loading || !scoreboard) {
		return <Loading />;
	}

	const teamColors = Object.values(ScoreboardTeamColor);

	return (
		<div className="flex flex-col gap-4 w-full">
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell />
						{scoreboard.rounds.map((round) => (
							<TableHeaderCell key={round.roundNumber}>
								Round {round.roundNumber}
							</TableHeaderCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{teamColors.map((teamColor, teamIndex) => (
						<TableRow key={teamColor}>
							<TableCell className={teamColorTextClasses[teamColor]}>
								{toTitleCase(teamColor)}
							</TableCell>
							{scoreboard.rounds.map((round, roundIndex) => {
								const isEditing =
									editingCell?.round === round.roundNumber &&
									editingCell?.teamColor === teamColor;
								const value = isEditing
									? draftValue
									: String(round.placements[teamColor]);

								return (
									<TableCell key={round.roundNumber}>
										<Input
											type="number"
											value={value}
											tabIndex={roundIndex * teamColors.length + teamIndex + 1}
											onFocus={() =>
												startEditing(
													round.roundNumber,
													teamColor,
													round.placements[teamColor],
												)
											}
											onChange={(e) => setDraftValue(e.target.value)}
											onBlur={commitEdit}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.currentTarget.blur();
												}
											}}
											className="w-16"
										/>
									</TableCell>
								);
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="flex gap-2">
				<Button variant="secondary" onClick={resetScoreboard}>
					Reset Scoreboard
				</Button>
			</div>
		</div>
	);
}

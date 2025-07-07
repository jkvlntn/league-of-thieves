"use client";
import React, { useState } from "react";
import CheckBox from "./CheckBox";
import PanelButton from "./PanelButton";
import StatusBox from "./StatusBox";
import Timer from "./Timer";
import Error from "./Error";

interface CheckBoxData {
	display: string;
	color: string;
	style: string;
}

const checkBoxData: Array<CheckBoxData> = [
	{
		display: "Ref",
		color: "white",
		style: "text-white",
	},
	{
		display: "Blue",
		color: "blue",
		style: "text-blue-500",
	},
	{
		display: "Purple",
		color: "purple",
		style: "text-purple-500",
	},
	{
		display: "Green",
		color: "green",
		style: "text-green-500",
	},
	{
		display: "Red",
		color: "red",
		style: "text-red-500",
	},
	{
		display: "Gold",
		color: "yellow",
		style: "text-yellow-500",
	},
];

interface ButtonData {
	display: string;
	command: string;
	sound?: string;
}

const buttonData: Array<ButtonData> = [
	{
		display: "Join",
		command: "join",
	},
	{
		display: "Leave",
		command: "leave",
	},
	{
		display: "Start Game",
		command: "play",
		sound: "321go.wav",
	},
	{
		display: "Game Over",
		command: "play",
		sound: "gameover.wav",
	},
	{
		display: "Take Positions",
		command: "play",
		sound: "takeposition.mp3",
	},
	{
		display: "Out of Bounds",
		command: "play",
		sound: "outofbounds.wav",
	},
	{
		display: "Overtime",
		command: "play",
		sound: "overtime.wav",
	},
	{
		display: "Timeout",
		command: "play",
		sound: "timeout.wav",
	},
	{
		display: "Raise Anchors",
		command: "play",
		sound: "anchors.wav",
	},
	{
		display: "4 Ships",
		command: "play",
		sound: "4ships.wav",
	},
	{
		display: "3 Ships",
		command: "play",
		sound: "3ships.wav",
	},
	{
		display: "2 Ships",
		command: "play",
		sound: "2ships.wav",
	},
];

interface CommandStatus {
	white: [boolean, string] | null;
	blue: [boolean, string] | null;
	purple: [boolean, string] | null;
	green: [boolean, string] | null;
	red: [boolean, string] | null;
	yellow: [boolean, string] | null;
}

interface Props {
	apiURL: string;
	apiKey: string;
}

const ControlPanel: React.FC<Props> = ({ apiURL, apiKey }) => {
	const [selectedColors, setSelectedColors] = useState<Array<string>>([]);
	const [statusHistory, setStatusHistory] = useState<Array<CommandStatus>>([]);
	const [displayStatusHistory, setDisplayStatusHistory] = useState(false);
	const [error, setError] = useState("");

	const updateSelectedColors = (color: string) => {
		if (selectedColors.includes(color)) {
			setSelectedColors(selectedColors.filter((c) => c !== color));
		} else {
			setSelectedColors([...selectedColors, color]);
		}
	};

	const runCommand = async (command: string, sound: string) => {
		try {
			const response = await fetch(`${apiURL}/api/bots/${command}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					colors: selectedColors,
					sound: sound,
					key: apiKey,
				}),
			});
			const result = await response.json();
			if (!response.ok) {
				setError(result.error);
				return;
			}
			setError("");
			setStatusHistory([result, ...statusHistory].slice(0, 7));
		} catch {
			setError("Could not connect to server");
		}
	};

	return (
		<div>
			<div className="p-5">
				<div className="flex sm:justify-center justify-between sm:gap-10 gap-3">
					{checkBoxData.map((data) => (
						<CheckBox
							key={data.color}
							className={data.style}
							onClick={() => updateSelectedColors(data.color)}
							checked={selectedColors.includes(data.color)}
						>
							{data.display}
						</CheckBox>
					))}
				</div>
				<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
					{buttonData.map((data, i) => (
						<PanelButton
							key={i}
							onClick={() => runCommand(data.command, data.sound || "")}
						>
							{data.display}
						</PanelButton>
					))}
				</div>
				<div className="mt-3 flex justify-center">
					<Error>{error}</Error>
				</div>
			</div>
			<div className="p-5 mt-5 ">
				<Timer apiURL={apiURL} apiKey={apiKey} />
			</div>
			<div className="p-5 mt-5">
				<div
					className="cursor-pointer"
					onClick={() => {
						setDisplayStatusHistory(!displayStatusHistory);
					}}
				>
					Bot Status History {displayStatusHistory ? "▲" : "▼"}
				</div>
				{displayStatusHistory && (
					<div className="flex justify-center mt-3">
						<table className="min-w-80">
							<thead>
								<tr>
									<td className=" bg-white text-white border-1 border-neutral-900">
										x
									</td>
									<td className="bg-blue-500 text-blue-500 border-1 border-neutral-900">
										x
									</td>
									<td className="bg-purple-500 text-purple-500 border-1 border-neutral-900">
										x
									</td>
									<td className="bg-green-500 text-green-500 border-1 border-neutral-900">
										x
									</td>
									<td className="bg-red-500 text-red-500 border-1 border-neutral-900">
										x
									</td>
									<td className="bg-yellow-500 text-yellow-500 border-1 border-neutral-900">
										x
									</td>
								</tr>
							</thead>
							<tbody>
								{statusHistory.map((result, i) => (
									<tr key={i}>
										<td>
											<StatusBox result={result.white} />
										</td>
										<td>
											<StatusBox result={result.blue} />
										</td>
										<td>
											<StatusBox result={result.purple} />
										</td>
										<td>
											<StatusBox result={result.green} />
										</td>
										<td>
											<StatusBox result={result.red} />
										</td>
										<td>
											<StatusBox result={result.yellow} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default ControlPanel;

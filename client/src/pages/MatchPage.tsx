import { AudioBotSound, AudioBotColor } from "@lot/common";
import { Button, Checkbox, Input } from "../components/Form";
import { useState } from "react";
import { Timer } from "../components/Timer";
import { postRequest } from "../lib/api";
import toast from "react-hot-toast";

function MatchPage() {
	const [selectedColors, setSelectedColors] = useState<AudioBotColor[]>([]);
	const [timerFormFields, setTimerFormFields] = useState<{
		minutes: string;
		seconds: string;
	}>({
		minutes: "",
		seconds: "",
	});

	const colorBotCheckboxData = [
		{
			botColor: AudioBotColor.WHITE,
			backgroundClass: "bg-gray-400",
			borderClass: "border-gray-400",
		},
		{
			botColor: AudioBotColor.BLUE,
			backgroundClass: "bg-blue-500",
			borderClass: "border-blue-500",
		},
		{
			botColor: AudioBotColor.PURPLE,
			backgroundClass: "bg-purple-500",
			borderClass: "border-purple-500",
		},
		{
			botColor: AudioBotColor.GREEN,
			backgroundClass: "bg-green-500",
			borderClass: "border-green-500",
		},
		{
			botColor: AudioBotColor.RED,
			backgroundClass: "bg-red-500",
			borderClass: "border-red-500",
		},
		{
			botColor: AudioBotColor.YELLOW,
			backgroundClass: "bg-yellow-500",
			borderClass: "border-yellow-500",
		},
	];

	const audioButtonData = [
		{
			sound: AudioBotSound.BEGIN,
			label: "Begin",
		},
		{
			sound: AudioBotSound.GAME_OVER,
			label: "Game Over",
		},
		{
			sound: AudioBotSound.TAKE_POSITION,
			label: "Take Position",
		},
		{
			sound: AudioBotSound.OUT_OF_BOUNDS,
			label: "Out of Bounds",
		},
		{
			sound: AudioBotSound.OVERTIME,
			label: "Overtime",
		},
		{
			sound: AudioBotSound.TIMEOUT,
			label: "Timeout",
		},
		{
			sound: AudioBotSound.ANCHORS,
			label: "Anchors",
		},
		{
			sound: AudioBotSound.FOUR_SHIPS,
			label: "4 Ships",
		},
		{
			sound: AudioBotSound.THREE_SHIPS,
			label: "3 Ships",
		},
		{
			sound: AudioBotSound.TWO_SHIPS,
			label: "2 Ships",
		},
	];

	async function sendBotCommand(endpoint: string, sound?: AudioBotSound) {
		try {
			const responseJson = await postRequest<void>(`/bots/${endpoint}`, {
				colors: selectedColors,
				sound: sound,
			});
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred");
			}
		}
	}

	async function sendTimerCommand(endpoint: string) {
		try {
			const responseJson = await postRequest<void>(`/timer/${endpoint}`, {
				seconds:
					(Number(timerFormFields.minutes) || 0) * 60 +
						Number(timerFormFields.seconds) || 0,
			});
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred");
			}
		}
	}

	function updateTimerFormField(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setTimerFormFields({ ...timerFormFields, [name]: value });
	}

	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<div className="text-3xl">Match Controls</div>
			<div className="flex gap-6">
				{colorBotCheckboxData.map((checkboxData) => (
					<Checkbox
						key={checkboxData.botColor}
						className={checkboxData.borderClass}
						checked={selectedColors.includes(checkboxData.botColor)}
						color={checkboxData.backgroundClass}
						onChange={() => {
							if (selectedColors.includes(checkboxData.botColor)) {
								setSelectedColors(
									selectedColors.filter(
										(color) => color !== checkboxData.botColor
									)
								);
							} else {
								setSelectedColors([...selectedColors, checkboxData.botColor]);
							}
						}}
					/>
				))}
			</div>
			<div className="flex gap-2">
				<Button variant="secondary" onClick={() => setSelectedColors([])}>
					Deselect All
				</Button>
				<Button
					variant="primary"
					onClick={() =>
						setSelectedColors([
							...colorBotCheckboxData.map((data) => data.botColor),
						])
					}
				>
					Select All
				</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-lg">
				<Button variant="primary" onClick={() => sendBotCommand("connect")}>
					Connect
				</Button>
				<Button variant="primary" onClick={() => sendBotCommand("Disconnect")}>
					Disconnect
				</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-lg">
				{audioButtonData.map((buttonData) => (
					<Button
						key={buttonData.sound}
						variant="secondary"
						onClick={() => sendBotCommand("play", buttonData.sound)}
					>
						{buttonData.label}
					</Button>
				))}
			</div>
			<div className="text-4xl">
				<Timer />
			</div>
			<div className="flex gap-2">
				<Button variant="primary" onClick={() => sendTimerCommand("start")}>
					Start
				</Button>
				<Button variant="primary" onClick={() => sendTimerCommand("stop")}>
					Stop
				</Button>
				<Button variant="primary" onClick={() => sendTimerCommand("reset")}>
					Reset
				</Button>
			</div>
			<div>
				<form
					className="flex gap-2"
					onSubmit={(e) => {
						e.preventDefault();
						console.log(timerFormFields);
						sendTimerCommand("set");
					}}
				>
					<Input
						type="number"
						name="minutes"
						value={timerFormFields.minutes}
						onChange={updateTimerFormField}
						placeholder="Minutes"
					/>
					<Input
						type="number"
						name="seconds"
						value={timerFormFields.seconds}
						onChange={updateTimerFormField}
						placeholder="Seconds"
					/>
					<Button type="submit" variant="primary">
						Set
					</Button>
				</form>
			</div>
		</div>
	);
}

export default MatchPage;

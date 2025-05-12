import React, { useEffect, useState } from "react";
import PanelButton from "./PanelButton";
import Error from "./Error";
import { io } from "socket.io-client";

interface Props {
	apiURL: string;
	apiKey: string;
}

const Timer: React.FC<Props> = ({ apiURL, apiKey }) => {
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);
	const [setMinutesTo, setSetMinutesTo] = useState<number | "">("");
	const [setSecondsTo, setSetSecondsTo] = useState<number | "">("");
	const [error, setError] = useState("");

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const getTime = async () => {
		try {
			const response = await fetch(`${apiURL}/api/timer`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
			const data = await response.json();
			if (!response.ok) {
				setError("Failed to sync timer");
				return;
			}
			setError("");
			setTime(data.time);
			setRunning(data.running);
		} catch {
			setError("An internal error has occured");
		}
	};

	const controlTimer = async (endpoint: string) => {
		try {
			const response = await fetch(`${apiURL}/api/timer/${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					time: (setMinutesTo || 0) * 60 + (setSecondsTo || 0),
					key: apiKey,
				}),
			});
			if (!response.ok) {
				const data = await response.json();
				setError(data.error);
				return;
			}
			setError("");
		} catch (e) {
			setError("An internal error has occured");
		}
	};

	const handleSetMinutesToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		if (input === "") {
			setSetMinutesTo(input);
			return;
		}
		const numerical = Number(input);
		if (!isNaN(numerical)) {
			setSetMinutesTo(numerical);
		}
	};

	const handleSetSecondsToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		if (input === "") {
			setSetSecondsTo(input);
			return;
		}
		const numerical = Number(input);
		if (!isNaN(numerical)) {
			setSetSecondsTo(numerical);
		}
	};

	useEffect(() => {
		const socket = io(`${apiURL}`, {
			transports: ["websocket"],
		});

		socket.on("timer", () => {
			getTime();
		});

		getTime();

		window.addEventListener("focus", getTime);

		return () => {
			window.removeEventListener("focus", getTime);
			socket.off("timer");
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (running) {
			interval = setInterval(() => {
				setTime((prev) => prev - 1);
			}, 1000);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [running]);

	return (
		<div>
			<div className="text-white text-6xl text-center">
				{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
					2,
					"0"
				)}`}
			</div>
			<div className="mt-5 flex justify-center gap-3">
				<PanelButton onClick={() => controlTimer("start")}>Start</PanelButton>
				<PanelButton onClick={() => controlTimer("stop")}>Stop</PanelButton>
				<PanelButton onClick={() => controlTimer("reset")}>Reset</PanelButton>
			</div>
			<div className="mt-3 ">
				<form
					className="flex justify-center gap-3 w-full"
					onSubmit={(e) => {
						e.preventDefault();
						controlTimer("set");
					}}
				>
					<input
						className="text-white border-2 p-2.5 w-24 transform hover:scale-105 transition-all "
						type="text"
						placeholder="Minutes"
						value={setMinutesTo}
						onChange={handleSetMinutesToChange}
					/>
					<input
						className="text-white border-2 p-2.5 w-24 transform hover:scale-105 transition-all "
						type="text"
						placeholder="Seconds"
						value={setSecondsTo}
						onChange={handleSetSecondsToChange}
					/>
					<PanelButton>Set</PanelButton>
				</form>
			</div>
			<div className="mt-3 flex justify-center">
				<Error>{error}</Error>
			</div>
		</div>
	);
};

export default Timer;

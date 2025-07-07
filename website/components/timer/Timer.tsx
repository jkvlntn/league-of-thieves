"use client";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

interface Props {
	apiURL: string;
}

const Timer: React.FC<Props> = ({ apiURL }) => {
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const getTime = async () => {
		try {
			console.log(apiURL);
			const response = await fetch(`${apiURL}/api/timer`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
			const data = await response.json();
			if (!response.ok) {
				return;
			}
			setTime(data.time);
			setRunning(data.running);
		} catch {}
	};

	useEffect(() => {
		const socket = io(`${apiURL}`, {
			transports: ["websocket"],
		});

		socket.on("timer", () => {
			console.log("updating");
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
		<div className="text-white text-8xl sm:text-9xl">
			{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
				2,
				"0"
			)}`}
		</div>
	);
};

export default Timer;

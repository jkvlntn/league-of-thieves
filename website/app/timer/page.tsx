"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const TimerPage = () => {
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);

	const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
		transports: ["websocket"],
	});

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const getTime = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/timer`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);
			const data = await response.json();
			if (!response.ok) {
				return;
			}
			setTime(data.time);
			setRunning(data.running);
		} catch {}
	};

	useEffect(() => {
		getTime();

		socket.on("timer", () => {
			console.log("updating");
			getTime();
		});

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
		<div className="bg-[#292224] min-h-screen min-w-full flex justify-center items-center">
			<div className="text-white text-9xl">
				{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
					2,
					"0"
				)}`}
			</div>
		</div>
	);
};

export default TimerPage;

import type { TimerStatus } from "@lot/common";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getRequest } from "../lib/api";
import toast from "react-hot-toast";

export function Timer() {
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);
	const [loading, setLoading] = useState(true);
	const interval = useRef<number | null>(null);

	async function syncTimer() {
		try {
			const responseJson = await getRequest<TimerStatus>("/timer");
			setTime(responseJson.data.time);
			setRunning(responseJson.data.running);
			setLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	useEffect(() => {
		syncTimer();
	}, []);

	useEffect(() => {
		const socket = io(`${import.meta.env.VITE_API_URL}`, {
			transports: ["websocket"],
		});

		socket.on("timer", () => {
			syncTimer();
		});

		window.addEventListener("focus", syncTimer);

		return () => {
			window.removeEventListener("focus", syncTimer);
			socket.off("timer");
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (running) {
			if (interval.current) {
				window.clearInterval(interval.current);
			}
			interval.current = window.setInterval(() => {
				setTime((prev) => {
					return prev - 1;
				});
			}, 1000);
		} else {
			if (interval.current) {
				window.clearInterval(interval.current);
				interval.current = null;
			}
		}

		return () => {
			if (interval.current) {
				window.clearInterval(interval.current);
			}
		};
	}, [running]);

	return (
		<div>
			{!loading &&
				`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
					time % 60
				).padStart(2, "0")}`}
		</div>
	);
}

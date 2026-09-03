import type { TimerStatus } from "@lot/common";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getRequest } from "../../lib/api";

function MatchTimer({
	onLoad,
	onError,
	className,
}: {
	onLoad: () => void;
	onError: (error: string) => void;
	className?: string;
}) {
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);
	const [loading, setLoading] = useState(true);
	const interval = useRef<number | null>(null);

	async function syncTimer() {
		try {
			const responseJson = await getRequest<TimerStatus>("/timer");
			setTime(responseJson.data.time);
			setRunning(responseJson.data.running);
		} catch (error) {
			if (error instanceof Error) {
				onError(error.message);
			} else {
				onError("An unknown error occurred");
			}
		} finally {
			setLoading(false);
			onLoad();
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
		<div className={className}>
			{!loading &&
				`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
					time % 60,
				).padStart(2, "0")}`}
		</div>
	);
}

export default MatchTimer;

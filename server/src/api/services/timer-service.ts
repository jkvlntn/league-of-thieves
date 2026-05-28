import { TimerStatus } from "@lot/common";
import Timer from "../models/timer";

const timer = new Timer(15 * 60);

export function startTimer(onFinish: () => void) {
	timer.setOnFinish(onFinish);
	timer.start();
}

export function stopTimer() {
	timer.stop();
}

export function resetTimer() {
	timer.reset();
}

export function setTimer(seconds: number) {
	timer.set(seconds);
}

export function getTimerStatus(): TimerStatus {
	return {
		time: timer.getSecondsRemaining(),
		running: timer.getIsRunning(),
	};
}

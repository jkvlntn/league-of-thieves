import * as timerService from "../services/timer-service";
import * as socketService from "../services/socket-service";
import { TimerStatus } from "@lot/common";
import { asyncHandler } from "../lib/request-handler";
import z from "zod";

export const startTimer = asyncHandler<void>(async (req, res, next) => {
	timerService.startTimer(emitTimerStatus);
	emitTimerStatus();
	return {
		status: 200,
		message: "Timer started",
		data: undefined,
	};
});

export const stopTimer = asyncHandler<void>(async (req, res, next) => {
	timerService.stopTimer();
	emitTimerStatus();
	return {
		status: 200,
		message: "Timer stopped",
		data: undefined,
	};
});

export const resetTimer = asyncHandler<void>(async (req, res, next) => {
	timerService.resetTimer();
	emitTimerStatus();
	return {
		status: 200,
		message: "Timer reset",
		data: undefined,
	};
});

export const setTimer = asyncHandler<void>(async (req, res, next) => {
	const seconds = z.coerce.number().min(1).max(86400).parse(req.body.seconds);
	timerService.setTimer(seconds);
	emitTimerStatus();
	return {
		status: 200,
		message: `Timer set`,
		data: undefined,
	};
});

export const getTimerStatus = asyncHandler<TimerStatus>(
	async (req, res, next) => {
		const status: TimerStatus = timerService.getTimerStatus();
		return {
			status: 200,
			message: "Timer status retrieved",
			data: status,
		};
	}
);

function emitTimerStatus() {
	socketService.emit("timer");
}

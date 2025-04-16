import { Request, Response } from "express";
import Timer from "../models/timer";
import { emitSocket } from "../socket";

const timer = new Timer(15 * 60);

timer.setOnFinish(() => {
	emitSocket("timer", {
		time: timer.getSecondsRemaining(),
		running: timer.getIsRunning(),
	});
});

export const getStatus = (req: Request, res: Response) => {
	res
		.status(200)
		.send({ time: timer.getSecondsRemaining(), running: timer.getIsRunning() });
};

export const startTimer = (req: Request, res: Response) => {
	timer.start();
	emitSocket("timer", {
		time: timer.getSecondsRemaining(),
		running: timer.getIsRunning(),
	});
	res.status(200).send();
};

export const stopTimer = (req: Request, res: Response) => {
	timer.stop();
	emitSocket("timer", {
		time: timer.getSecondsRemaining(),
		running: timer.getIsRunning(),
	});

	res.status(200).send();
};

export const resetTimer = (req: Request, res: Response) => {
	timer.reset();
	emitSocket("timer", {
		time: timer.getSecondsRemaining(),
		running: timer.getIsRunning(),
	});

	res.status(200).send();
};

export const setTimer = (req: Request, res: Response) => {
	let setTo = Number(req.body.time);
	if (isNaN(setTo) || setTo > 86400 || setTo < 1) {
		res.status(400).send({ error: "Invalid time" });
		return;
	}
	setTo = Math.floor(setTo);
	timer.set(setTo);
	emitSocket("timer", {
		time: timer.getSecondsRemaining(),
		running: timer.getIsRunning(),
	});
	res.status(200).send();
};

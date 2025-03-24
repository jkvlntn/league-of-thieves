import { Request, Response, NextFunction } from "express";
import Timer from "../models/timer";

const timer = new Timer(15 * 60);

export const startTimer = (req: Request, res: Response) => {
	timer.start();
	res.status(200).send();
};

export const stopTimer = (req: Request, res: Response) => {
	timer.stop();
	res.status(200).send();
};

export const resetTimer = (req: Request, res: Response) => {
	timer.reset();
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
	res.status(200).send();
};

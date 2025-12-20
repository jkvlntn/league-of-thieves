import { Request, Response, NextFunction } from "express";
import { BotColor } from "@lot/common";

const botColors: Array<BotColor> = [
	"white",
	"red",
	"blue",
	"green",
	"purple",
	"yellow",
];

export const validateColors = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const colors = req.body.colors;
	const selectedColors: Array<BotColor> = [];
	if (Array.isArray(colors)) {
		for (const color of colors) {
			if (botColors.includes(color) && !selectedColors.includes(color)) {
				selectedColors.push(color);
			}
		}
	}
	if (selectedColors.length == 0) {
		res.status(400).send({ error: "No bot colors selected" });
		return;
	}
	req.selectedColors = selectedColors;
	next();
};

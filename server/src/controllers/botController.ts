import path from "path";
import fs from "fs";
import { audioDirectory } from "../utils";
import { BotColor } from "../types";
import Bot from "../models/bot";
import { Request, Response, NextFunction } from "express";

const botColors: Array<BotColor> = [
	"white",
	"red",
	"blue",
	"green",
	"purple",
	"yellow",
];
let bots: Map<BotColor, Bot | undefined> = new Map();

export const registerBots = async (): Promise<
	Map<BotColor, Bot | undefined>
> => {
	for (const color of botColors) {
		const token = process.env[`${color.toUpperCase()}_TOKEN`];
		const channel = process.env[`${color.toUpperCase()}_CHANNEL`];
		if (token && channel) {
			const bot = new Bot(token, channel);
			bots.set(color, bot);
			const loginSuccess = await bot.login();
			if (!loginSuccess) {
				bots.set(color, undefined);
				console.log(`${color} bot failed to connect`);
			} else {
				const channelSuccess = await bot.getChannelFromId();
				if (!channelSuccess) {
					console.log(`Channel for ${color} bot not found`);
				}
			}
		} else {
			bots.set(color, undefined);
			console.log(`Missing data for ${color}`);
		}
	}
	return bots;
};

export const applyToBots = (
	selectedColors: Array<BotColor>,
	botFunction: (bot: Bot) => boolean,
	successMessage: string,
	errorMessage: string
): Map<BotColor, [boolean, string] | null> => {
	const resultsMap = getResultMap();
	for (const color of selectedColors) {
		const bot = bots.get(color);
		if (!bot) {
			resultsMap.set(color, [false, "Bot is not online"]);
		} else {
			const joinResult = botFunction(bot);
			if (joinResult) {
				resultsMap.set(color, [true, successMessage]);
			} else {
				resultsMap.set(color, [false, errorMessage]);
			}
		}
	}
	return resultsMap;
};

const getResultMap = (): Map<BotColor, [boolean, string] | null> => {
	const resultMap: Map<BotColor, [boolean, string] | null> = new Map();
	for (const color of botColors) {
		resultMap.set(color, null);
	}
	return resultMap;
};

export const joinBots = (req: Request, res: Response) => {
	const selectedColors = req.selectedColors || [];
	const resultsMap = applyToBots(
		selectedColors,
		(bot) => {
			return bot.joinVoiceChannel();
		},
		"Successfully joined voice channel",
		"Failed to join voice channel"
	);
	res.status(200).send(Object.fromEntries(resultsMap));
};

export const leaveBots = (req: Request, res: Response) => {
	const selectedColors = req.selectedColors || [];
	const resultsMap = applyToBots(
		selectedColors,
		(bot) => {
			return bot.leaveVoiceChannel();
		},
		"Successfully left voice channel",
		"Failed to leave voice channel"
	);
	res.status(200).send(Object.fromEntries(resultsMap));
};

export const playBots = (req: Request, res: Response) => {
	const selectedColors = req.selectedColors || [];
	const audioFile = req.body.sound;
	const audioFilePath = path.join(audioDirectory, audioFile);
	if (!fs.existsSync(audioFilePath)) {
		res.status(400).send({ error: `Audio file ${audioFile} not found` });
		return;
	}
	const resultsMap = applyToBots(
		selectedColors,
		(bot) => {
			return bot.playAudio(audioFilePath);
		},
		`Successfully played ${audioFile}`,
		`Failed to play ${audioFile}`
	);
	res.status(200).send(Object.fromEntries(resultsMap));
};

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

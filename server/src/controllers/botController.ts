import path from "path";
import { audioDirectory } from "../utils";
import { BotConfig, BotData, BotColor } from "../types";
import { Bot } from "../models/bot";

const botColors: Array<BotColor> = [
	"white",
	"red",
	"blue",
	"green",
	"purple",
	"yellow",
];
let bots: Map<BotColor, Bot | undefined> = new Map();

export const registerBots = async (
	botConfigFile: string
): Promise<Map<BotColor, Bot | undefined>> => {
	const botConfig: BotConfig = require(botConfigFile);
	for (const color of botColors) {
		let botData: BotData | undefined = botConfig[color];
		if (botData) {
			const bot = new Bot(botData.token, botData.channel);
			bots.set(color, bot);
			const loginSuccess = await bot.login();
			if (!loginSuccess) {
				bots.set(color, undefined);
				console.log(`${color} bot failed to connect!`);
			} else {
				const channelSuccess = await bot.getChannelFromId();
				if (!channelSuccess) {
					console.log(`Channel for ${color} bot not found!`);
				}
			}
		} else {
			bots.set(color, undefined);
			console.log(`No data found for ${color} ${botConfigFile}!`);
		}
	}
	return bots;
};

export const joinVoiceChannel = (
	selectedColors: Array<BotColor>
): Map<BotColor, [boolean, string] | null> => {
	const resultsMap = getResultMap();
	for (const color of selectedColors) {
		const bot = bots.get(color);
		if (!bot) {
			resultsMap.set(color, [false, "Bot is not online"]);
		} else {
			const joinResult = bot.joinVoiceChannel();
			if (joinResult) {
				resultsMap.set(color, [true, "Successfully joined voice channel"]);
			} else {
				resultsMap.set(color, [false, "Failed to join voice channel"]);
			}
		}
	}
	return resultsMap;
};

export const leaveVoiceChannel = (
	selectedColors: Array<BotColor>
): Map<BotColor, [boolean, string] | null> => {
	const resultsMap = getResultMap();
	for (const color of selectedColors) {
		const bot = bots.get(color);
		if (!bot) {
			resultsMap.set(color, [false, "Bot is not online"]);
		} else {
			const joinResult = bot.leaveVoiceChannel();
			if (joinResult) {
				resultsMap.set(color, [true, "Successfully left voice channel"]);
			} else {
				resultsMap.set(color, [false, "Failed to leave voice channel"]);
			}
		}
	}
	return resultsMap;
};

export const playAudio = (
	selectedColors: Array<BotColor>,
	audioFile: string
): Map<BotColor, [boolean, string] | null> => {
	const resultsMap = getResultMap();
	for (const color of selectedColors) {
		const bot = bots.get(color);
		if (!bot) {
			resultsMap.set(color, [false, "Bot is not online"]);
		} else {
			const joinResult = bot.playAudio(path.join(audioDirectory, audioFile));
			if (joinResult) {
				resultsMap.set(color, [
					true,
					`Successfully played audio: ${audioFile}`,
				]);
			} else {
				resultsMap.set(color, [false, `Failed to play audio ${audioFile}`]);
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

export const getValidatedColors = (selectedColors: any): Array<BotColor> => {
	if (!Array.isArray(selectedColors)) {
		return [];
	}
	const selectedBotColors: Array<BotColor> = [];
	for (const color of selectedColors) {
		if (botColors.includes(color) && !selectedBotColors.includes(color)) {
			selectedBotColors.push(color);
		}
	}
	return selectedBotColors;
};

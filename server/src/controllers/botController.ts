import { BotConfig, BotData, BotColor } from "../types";
import { Bot } from "../models/bot";

const botColors: Array<BotColor> = ["white", "red", "blue", "green", "purple"];

export const registerBots = async (
	botConfigFile: string
): Promise<Map<BotColor, Bot | undefined>> => {
	const botConfig: BotConfig = require(botConfigFile);
	let bots: Map<BotColor, Bot | undefined> = new Map();
	for (const color of botColors) {
		let botData: BotData | undefined = botConfig[color];
		if (botData) {
			const bot = new Bot(botData.id, botData.token, botData.channel);
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

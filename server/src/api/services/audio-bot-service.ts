import { AudioBotColor } from "@lot/common";
import { AudioBot } from "../models/audio-bot";
import dotenv from "dotenv";

dotenv.config();
const bots: Map<AudioBotColor, AudioBot> = new Map();
const colors: AudioBotColor[] = [
	AudioBotColor.WHITE,
	AudioBotColor.RED,
	AudioBotColor.BLUE,
	AudioBotColor.GREEN,
	AudioBotColor.PURPLE,
	AudioBotColor.YELLOW,
];
initializeBots();

async function initializeBots() {
	for (const color of colors) {
		const token = process.env[`${color.toUpperCase()}_TOKEN`] || "";
		const channel = process.env[`${color.toUpperCase()}_CHANNEL`] || "";
		const bot = new AudioBot(token, channel);
		if ((await bot.login()) && (await bot.getChannelFromId())) {
			bots.set(color, bot);
		}
	}
}
export function onlineBots() {
	return colors.filter((color) => bots.has(color));
}

export function connectBots(botColors: Set<AudioBotColor>) {
	botColors.forEach((color) => {
		bots.get(color)?.joinVoiceChannel();
	});
}

export function disconnectBots(botColors: Set<AudioBotColor>) {
	botColors.forEach((color) => {
		bots.get(color)?.leaveVoiceChannel();
	});
}

export function playAudioOnBots(
	botColors: Set<AudioBotColor>,
	audioFilePath: string
) {
	botColors.forEach((color) => {
		bots.get(color)?.playAudio(audioFilePath);
	});
}

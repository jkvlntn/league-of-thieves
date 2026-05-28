import { AudioBotSound, AudioBotColor } from "@lot/common";
import { asyncHandler } from "../lib/request-handler";
import * as audioBotService from "../services/audio-bot-service";
import z from "zod";
import path from "path";
import { audioFileMapping } from "../../lib/constants/audio-file-mapping";
import fs from "fs";
import { HttpError } from "../models/http-error";

const colorsSchema = z.object({
	colors: z.array(z.enum(AudioBotColor)).transform((arr) => new Set(arr)),
});

const soundSchema = z.object({
	colors: z.array(z.enum(AudioBotColor)).transform((arr) => new Set(arr)),
	sound: z.enum(AudioBotSound),
});

export const getOnlineBots = asyncHandler<AudioBotColor[]>(
	async (req, res, next) => {
		const onlineBots = audioBotService.onlineBots();
		return {
			message: "Bots retrieved successfully",
			status: 200,
			data: onlineBots,
		};
	}
);

export const connectBots = asyncHandler<void>(async (req, res, next) => {
	const { colors } = colorsSchema.parse(req.body);
	audioBotService.connectBots(colors);
	return {
		message: "Connected bots successfully",
		status: 200,
		data: undefined,
	};
});

export const disconnectBots = asyncHandler<void>(async (req, res, next) => {
	const { colors } = colorsSchema.parse(req.body);
	audioBotService.disconnectBots(colors);
	return {
		message: "Disconnected bots successfully",
		status: 200,
		data: undefined,
	};
});

export const playAudio = asyncHandler<void>(async (req, res, next) => {
	const { colors, sound } = soundSchema.parse(req.body);

	const audioFilePath = path.join(
		__dirname,
		"../../../assets/audio",
		audioFileMapping[sound]
	);
	if (!fs.existsSync(audioFilePath)) {
		throw new HttpError(500, `Audio file for sound ${sound} not found.`);
	}
	audioBotService.playAudioOnBots(colors, audioFilePath);
	return {
		message: "Audio played successfully",
		status: 200,
		data: undefined,
	};
});

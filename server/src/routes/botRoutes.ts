import express, { Router } from "express";
import {
	getValidatedColors,
	joinVoiceChannel,
	leaveVoiceChannel,
	playAudio,
} from "../controllers/botController";

const router = express.Router();

router.use((req, res, next) => {
	const validColors = getValidatedColors(req.body.colors);
	if (validColors.length === 0) {
		res.status(400).send({ error: "No bot colors selected" });
	}
	req.selectedColors = validColors;
	next();
});

router.post("/join", (req, res) => {
	const selectedColors = req.selectedColors || [];
	const resultMap = joinVoiceChannel(selectedColors);
	res.status(200).send(Object.fromEntries(resultMap));
});

router.post("/leave", (req, res) => {
	const selectedColors = req.selectedColors || [];
	const resultMap = leaveVoiceChannel(selectedColors);
	res.status(200).send(Object.fromEntries(resultMap));
});

router.post("/play", (req, res) => {
	const selectedColors = req.selectedColors || [];
	const resultMap = playAudio(selectedColors, "321go.wav");
	res.status(200).send(Object.fromEntries(resultMap));
});

export default router;

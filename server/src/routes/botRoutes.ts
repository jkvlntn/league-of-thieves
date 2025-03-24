import express from "express";
import {
	validateColors,
	joinBots,
	leaveBots,
	playBots,
} from "../controllers/botController";

const router = express.Router();

router.post("/join", validateColors, joinBots);
router.post("/leave", validateColors, leaveBots);
router.post("/play", validateColors, playBots);

export default router;

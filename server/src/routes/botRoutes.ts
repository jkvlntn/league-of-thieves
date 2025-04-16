import express from "express";
import { validateAuthorization } from "../controllers/auth";
import {
	validateColors,
	joinBots,
	leaveBots,
	playBots,
} from "../controllers/botController";

const router = express.Router();

router.post("/join", validateAuthorization, validateColors, joinBots);
router.post("/leave", validateAuthorization, validateColors, leaveBots);
router.post("/play", validateAuthorization, validateColors, playBots);

export default router;

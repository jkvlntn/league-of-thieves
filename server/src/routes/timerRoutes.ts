import express from "express";
import {
	startTimer,
	stopTimer,
	setTimer,
	resetTimer,
} from "../controllers/timerController";

const router = express.Router();

router.post("/start", startTimer);
router.post("/stop", stopTimer);
router.post("/reset", resetTimer);
router.post("/set", setTimer);

export default router;

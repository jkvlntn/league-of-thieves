import express from "express";
import { validateAuthorization } from "../controllers/auth";
import {
	startTimer,
	stopTimer,
	setTimer,
	resetTimer,
	getStatus,
} from "../controllers/timerController";

const router = express.Router();

router.get("", getStatus);

router.post("/start", validateAuthorization, startTimer);
router.post("/stop", validateAuthorization, stopTimer);
router.post("/reset", validateAuthorization, resetTimer);
router.post("/set", validateAuthorization, setTimer);

export default router;

import express from "express";
import * as audioBotController from "../controllers/audio-bot-controller";

const router = express.Router();

router.post("/connect", audioBotController.connectBots);
router.post("/disconnect", audioBotController.disconnectBots);
router.post("/play", audioBotController.playAudio);

export default router;

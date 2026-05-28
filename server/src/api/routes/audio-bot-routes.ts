import express from "express";
import * as audioBotController from "../controllers/audio-bot-controller";
import { getStaffId, hasStaffPermissions } from "../middleware/auth-middleware";
import { StaffPermissionName } from "@lot/common";

const router = express.Router();

router.post(
	"/connect",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	audioBotController.connectBots,
);
router.post(
	"/disconnect",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	audioBotController.disconnectBots,
);
router.post(
	"/play",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	audioBotController.playAudio,
);

export default router;

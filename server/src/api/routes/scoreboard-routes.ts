import express from "express";
import * as scoreboardController from "../controllers/scoreboard-controller";
import { getStaffId, hasStaffPermissions } from "../middleware/auth-middleware";
import { StaffPermissionName } from "@lot/common";

const router = express.Router();

router.get("", scoreboardController.getScoreboard);
router.post(
	"/reset",
	// getStaffId,
	// hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	scoreboardController.resetScoreboard,
);
router.post(
	"/set",
	// getStaffId,
	// hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	scoreboardController.setScoreboardScore,
);

export default router;

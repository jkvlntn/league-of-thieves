import express from "express";
import * as timerController from "../controllers/timer-controller";
import { hasStaffPermissions } from "../middleware/auth-middleware";
import { StaffPermissionName } from "@lot/common";

const router = express.Router();

router.get("", timerController.getTimerStatus);
router.post(
	"/start",
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	timerController.startTimer
);
router.post(
	"/stop",
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	timerController.stopTimer
);
router.post(
	"/reset",
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	timerController.resetTimer
);
router.post(
	"/set",
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	timerController.setTimer
);

export default router;

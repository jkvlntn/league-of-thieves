import express from "express";
import * as timerController from "../controllers/timer-controller";
import { getStaffId, hasStaffPermissions } from "../middleware/auth-middleware";
import { StaffPermissionName } from "@lot/common";

const router = express.Router();

router.get("", timerController.getTimerStatus);
router.post(
	"/start",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	timerController.startTimer,
);
router.post(
	"/stop",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	timerController.stopTimer,
);
router.post(
	"/reset",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	timerController.resetTimer,
);
router.post(
	"/set",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.REFEREE_MATCHES),
	timerController.setTimer,
);

export default router;

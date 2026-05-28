import express from "express";
import * as playerEndpoints from "../controllers/player-controller";
import { getStaffId, hasStaffPermissions } from "../middleware/auth-middleware";
import { StaffPermissionName } from "@lot/common";

const router = express.Router();

router.get("", playerEndpoints.getPlayers);
router.get("/:id", playerEndpoints.getPlayerById);
router.get("/username/:username", playerEndpoints.getPlayerByUsername);
router.post(
	"",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.MANAGE_PLAYERS),
	playerEndpoints.createPlayer,
);
router.delete(
	"/:id",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.MANAGE_PLAYERS),
	playerEndpoints.deletePlayer,
);
router.patch(
	"/:id",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.MANAGE_PLAYERS),
	playerEndpoints.updatePlayer,
);

export default router;

import express from "express";
import * as teamEndpoints from "../controllers/team-controller";
import { hasStaffPermissions } from "../middleware/auth-middleware";
import { StaffPermissionName } from "@lot/common";

const router = express.Router();

router.get("", teamEndpoints.getTeams);
router.get("/name/:slugName", teamEndpoints.getTeamBySlugName);
router.get("/:id", teamEndpoints.getTeamById);
router.post(
	"/",
	hasStaffPermissions(StaffPermissionName.MANAGE_TEAMS),
	teamEndpoints.createTeam
);
router.delete(
	"/:id",
	hasStaffPermissions(StaffPermissionName.MANAGE_TEAMS),
	teamEndpoints.deleteTeam
);
router.patch(
	"/:id",
	hasStaffPermissions(StaffPermissionName.MANAGE_TEAMS),
	teamEndpoints.updateTeam
);

export default router;

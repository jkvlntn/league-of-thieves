import express from "express";
import * as staffEndpoints from "../controllers/staff-controller";
import { getStaffId, hasStaffPermissions } from "../middleware/auth-middleware";
import { StaffPermissionName } from "@lot/common";

const router = express.Router();

router.get(
	"",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.MANAGE_STAFF),
	staffEndpoints.getStaff,
);
router.post(
	"",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.MANAGE_STAFF),
	staffEndpoints.createStaff,
);
router.patch(
	"/:id",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.MANAGE_STAFF),
	staffEndpoints.updateStaff,
);
router.delete(
	"/:id",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.MANAGE_STAFF),
	staffEndpoints.deleteStaff,
);
router.post(
	"/:id/reset",
	getStaffId,
	hasStaffPermissions(StaffPermissionName.MANAGE_STAFF),
	staffEndpoints.resetStaffActivation,
);

export default router;

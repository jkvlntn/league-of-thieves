import express from "express";
import * as rankedMatchEndpoints from "../controllers/ranked-match-controller";
import { getStaffId, hasStaffPermissions } from "../middleware/auth-middleware";
import { StaffPermissionName } from "@lot/common";

const router = express.Router();

router.get("/open", rankedMatchEndpoints.getOpenMatches);
router.get("/pending", rankedMatchEndpoints.getPendingMatches);
router.get("/completed", rankedMatchEndpoints.getCompletedMatches);
// router.post("/", rankedMatchEndpoints.createRankedMatch);

export default router;

import express from "express";
import * as authEndpoints from "../controllers/auth-controller";
import { getStaffId } from "../middleware/auth-middleware";

const router = express.Router();

router.get("/", getStaffId, authEndpoints.getLoggedInStaff);
router.post("/login", authEndpoints.loginStaff);
router.post("/activate", authEndpoints.activateStaff);

export default router;

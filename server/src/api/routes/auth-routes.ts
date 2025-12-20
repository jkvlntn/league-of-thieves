import express from "express";
import * as authEndpoints from "../controllers/auth-controller";

const router = express.Router();

router.post("/staff/login", authEndpoints.loginStaff);
router.post("/staff/register", authEndpoints.registerStaff);

export default router;

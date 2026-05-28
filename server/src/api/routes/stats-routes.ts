import express from "express";
import * as statsEndpoints from "../controllers/stats-controller";

const router = express.Router();

router.get("", statsEndpoints.getStats);

export default router;

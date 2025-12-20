import express from "express";
import * as staffEndpoints from "../controllers/staff-controller";

const router = express.Router();

router.get("", staffEndpoints.getStaff);
router.post("", staffEndpoints.createStaff);
router.patch("/:id", staffEndpoints.updateStaff);
router.delete("/:id", staffEndpoints.deleteStaff);

export default router;

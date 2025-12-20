import express from "express";
import * as playerEndpoints from "../controllers/player-controller";

const router = express.Router();

router.get("", playerEndpoints.getPlayers);
router.get("/:id", playerEndpoints.getPlayerById);
router.get("/username/:username", playerEndpoints.getPlayerByUsername);
router.post("", playerEndpoints.createPlayer);
router.delete("/:id", playerEndpoints.deletePlayer);
router.patch("/:id", playerEndpoints.updatePlayer);

export default router;

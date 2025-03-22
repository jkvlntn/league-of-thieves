import express from "express";
import { registerBots } from "./controllers/botController";
import path from "path";

const app = express();
const port = 8000;
const serverDirectory = path.join(path.resolve(__dirname), "../");

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

registerBots(path.join(serverDirectory, "bot-config.json")).then((bots) => {
	bots.get("white")?.joinVoiceChannel();
	bots.get("red")?.joinVoiceChannel();
});

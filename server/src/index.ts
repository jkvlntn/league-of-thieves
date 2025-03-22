import express from "express";
import { serverDirectory } from "./utils";
import path from "path";
import { registerBots } from "./controllers/botController";
import botRouter from "./routes/botRoutes";

const app = express();
const port = 8000;

app.use(express.json());

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

registerBots(path.join(serverDirectory, "bot-config.json")).then((bots) => {
	app.use("/api/bots", botRouter);
});

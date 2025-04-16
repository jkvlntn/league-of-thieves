import express from "express";
import cors from "cors";
import { serverDirectory } from "./utils";
import dotenv from "dotenv";
import path from "path";
import { registerBots } from "./controllers/botController";
import botRouter from "./routes/botRoutes";
import timerRouter from "./routes/timerRoutes";
import http from "http";
import { initializeSocket } from "./socket";

dotenv.config();
const port = process.env.PORT || 8000;
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();

app.use(
	cors({
		origin: allowedOrigin,
		credentials: true,
	})
);

app.use(express.json());

const server = http.createServer(app);
initializeSocket(server);

registerBots(path.join(serverDirectory, "bot-config.json")).then((bots) => {
	app.use("/api/bots", botRouter);
});

app.use("/api/timer", timerRouter);

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

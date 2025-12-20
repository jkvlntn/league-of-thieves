import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./api/middleware/error-middleware";
import * as socketService from "./api/services/socket-service";
import botRouter from "./api/routes/audio-bot-routes";
import timerRouter from "./api/routes/timer-routes";
import playerRouter from "./api/routes/player-routes";
import teamRouter from "./api/routes/team-routes";
import authRouter from "./api/routes/auth-routes";
import staffRouter from "./api/routes/staff-routes";
import http from "http";

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

app.use((req, res, next) => {
	console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
	next();
});

app.use(express.json());

const server = http.createServer(app);
socketService.initialize(server);

app.use("/api/bots", botRouter);
app.use("/api/timer", timerRouter);
app.use("/api/players", playerRouter);
app.use("/api/teams", teamRouter);
app.use("/api/auth", authRouter);
app.use("/api/staff", staffRouter);

app.use(errorHandler);

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

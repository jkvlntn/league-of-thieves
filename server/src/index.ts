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
import statsRouter from "./api/routes/stats-routes";
import http from "http";

import rateLimit from "express-rate-limit";
import { HttpError } from "./api/models/http-error";

dotenv.config();
const port = process.env.PORT || 8000;
const allowedOrigins = process.env.FRONTEND_URL || "http://localhost:3000";
const multipleOrigins = allowedOrigins
	.split(",")
	.map((origin) => origin.trim());

const app = express();

app.use(
	cors({
		origin: multipleOrigins,
		credentials: true,
	}),
);

app.use((req, res, next) => {
	console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
	next();
});

app.use(express.json());

const server = http.createServer(app);
socketService.initialize(server);

app.use(
	rateLimit({
		windowMs: 60000,
		max: 100,
		standardHeaders: true,
		legacyHeaders: false,
		handler: (req, res, next) => {
			next(new HttpError(429, "Too many requests, please try again later"));
		},
	}),
);

app.use("/api/bots", botRouter);
app.use("/api/timer", timerRouter);
app.use("/api/players", playerRouter);
app.use("/api/teams", teamRouter);
app.use("/api/auth", authRouter);
app.use("/api/staff", staffRouter);
app.use("/api/stats", statsRouter);

app.use(errorHandler);

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

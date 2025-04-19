import { Request } from "express";

export type BotColor = "white" | "red" | "blue" | "green" | "purple" | "yellow";

declare global {
	namespace Express {
		interface Request {
			selectedColors?: Array<BotColor>;
		}
	}
}

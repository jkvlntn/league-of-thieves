import { Request } from "express";

export type BotConfig = {
	white?: BotData;
	red?: BotData;
	blue?: BotData;
	green?: BotData;
	purple?: BotData;
	yellow?: BotData;
};
export type BotData = {
	id: string;
	token: string;
	channel: string;
};
export type BotColor = "white" | "red" | "blue" | "green" | "purple" | "yellow";

declare global {
	namespace Express {
		interface Request {
			selectedColors?: Array<BotColor>;
		}
	}
}

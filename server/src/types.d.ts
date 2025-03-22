export type BotConfig = {
	white?: BotData;
	red?: BotData;
	blue?: BotData;
	green?: BotData;
	purple?: BotData;
};
export type BotData = {
	id: string;
	token: string;
	channel: string;
};
export type BotColor = "white" | "red" | "blue" | "green" | "purple";

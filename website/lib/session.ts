import { SessionOptions } from "iron-session";

export interface SessionData {
	accessLevel?: number;
}

export const sessionOptions: SessionOptions = {
	password: process.env.AUTH_SECRET || "",
	cookieName: "lot-session",
	cookieOptions: {
		httpOnly: true,
		secure: false,
	},
};

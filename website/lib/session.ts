import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

interface SessionData {
	accessLevel?: number;
}

const sessionOptions: SessionOptions = {
	password: process.env.AUTH_SECRET || "",
	cookieName: "lot-session",
	ttl: 86400,
	cookieOptions: {
		httpOnly: true,
		secure: process.env.NODE_ENV == "production",
	},
};

export async function getSession() {
	const cookieStore = await cookies();
	const session = await getIronSession<SessionData>(
		cookieStore,
		sessionOptions
	);

	if (!session.accessLevel) {
		session.accessLevel = 0;
	}

	return session;
}

export async function validateRef() {
	const session = await getSession();
	if (!session.accessLevel || session.accessLevel < 1) {
		return false;
	}
	return true;
}

export async function validateAdmin() {
	const session = await getSession();
	if (!session.accessLevel || session.accessLevel < 2) {
		return false;
	}
	return true;
}

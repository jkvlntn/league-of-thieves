import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
	"use server";
	const cookieStore = await cookies();
	const session = await getIronSession<SessionData>(
		cookieStore,
		sessionOptions
	);

	if (!session.accessLevel) {
		session.accessLevel = 0;
	}

	return session;
};

export const login = async (formData: FormData) => {
	"use server";
	const session = await getSession();
	const enteredPassword = formData.get("password") as string;

	if (enteredPassword === process.env.REF_PASSWORD) {
		session.accessLevel = 1;
		await session.save();
		redirect("/ref");
	} else if (enteredPassword === process.env.ADMIN_PASSWORD) {
		session.accessLevel = 2;
		await session.save();
		redirect("/");
	}
};

export const logout = async () => {
	"use server";
	const session = await getSession();
	session.destroy();
	redirect("/login");
};

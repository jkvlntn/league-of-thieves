"use server";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function login(formData: FormData): Promise<{ message: string }> {
	let redirectLocation = "/";
	const session = await getSession();
	const enteredPassword = formData.get("password")?.toString();
	const refPassword = process.env.REF_PASSWORD || "";
	const adminPassword = process.env.ADMIN_PASSWORD || "";
	if (enteredPassword === refPassword) {
		session.accessLevel = 1;
		await session.save();
		redirectLocation = "/ref";
	} else if (enteredPassword === adminPassword) {
		session.accessLevel = 2;
		await session.save();
		redirectLocation = "/admin";
	} else {
		return { message: "Incorrect password" };
	}
	redirect(redirectLocation);
}

export async function logout() {
	const session = await getSession();
	session.destroy();
	redirect("/login");
}

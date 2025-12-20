import * as z from "zod";
import path from "path";
import bcrypt from "bcrypt";

export function parseId(id: any): number {
	return z.coerce
		.number("ID must be a number")
		.int("ID must be an integer")
		.positive("ID must be positive")
		.parse(id);
}

export function slugify(str: string) {
	return str.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function generatePassword(length: number = 8): string {
	const charset =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let password = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}
	return password;
}

export async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, 10);
}

export async function checkPassword(
	password: string,
	hash: string
): Promise<boolean> {
	return await bcrypt.compare(password, hash);
}

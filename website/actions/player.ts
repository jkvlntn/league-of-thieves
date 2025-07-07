"use server";
import db from "@/lib/database";
import z from "zod/v4";
import { validateAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addPlayer(
	formData: FormData
): Promise<{ success?: boolean; message: string }> {
	if (!validateAdmin()) {
		return { message: "You do not have permission to add a player" };
	}
	const schema = z.object({
		username: z.string().trim().min(1, "Name is required"),
		image: z.url("Image must be a valid URL").optional(),
		teamId: z.coerce.number().int("Team ID must be an integer").optional(),
		priority: z.coerce
			.number()
			.int("Priority must be an integer")
			.min(0, "Priority must be between 0 and 9")
			.max(9, "Priority must be between 0 and 9")
			.optional(),
	});
	const data = {
		username: formData.get("username")?.toString(),
		image: formData.get("image")?.toString() || undefined,
		teamId: formData.get("teamId")?.toString() || undefined,
		priority: formData.get("priority")?.toString() || undefined,
	};
	const result = schema.safeParse(data);
	if (!result.success) {
		return { message: z.prettifyError(result.error) };
	}
	try {
		if (result.data.teamId) {
			const team = await db.team.findFirst({
				where: { id: result.data.teamId },
			});
			if (!team) {
				return { message: "Team not found" };
			}
		}
		await db.player.create({
			data: result.data,
		});
	} catch (e) {
		return { message: "Failed to add player" };
	}
	return { success: true, message: "Player added successfully" };
}

export async function deletePlayer(id: number): Promise<{ message: string }> {
	if (!validateAdmin()) {
		return { message: "You do not have permission to delete a player" };
	}
	const schema = z.coerce.number().int("Player ID must be an integer");
	const result = schema.safeParse(id);
	if (!result.success) {
		return { message: z.prettifyError(result.error) };
	}
	try {
		const player = await db.player.findFirst({
			where: { id: result.data },
		});
		if (!player) {
			return { message: "Player not found" };
		}
		await db.player.delete({
			where: { id: result.data },
		});
	} catch (e) {
		return { message: "Failed to delete player" };
	}
	redirect("/admin/players");
}

export async function updatePlayer(
	formData: FormData,
	id: number
): Promise<{ success?: boolean; message: string }> {
	if (!validateAdmin()) {
		return { message: "You do not have permission to modify this player" };
	}
	const schema = z.object({
		id: z.coerce.number().int("Player ID must be an integer"),
		username: z.string().trim().min(1, "Name is required"),
		image: z.url("Image must be a valid URL").nullable(),
		teamId: z.coerce.number().int("Team ID must be an integer").nullable(),
		priority: z.coerce
			.number()
			.int("Priority must be an integer")
			.min(0, "Priority must be between 0 and 9")
			.max(9, "Priority must be between 0 and 9"),
	});

	const data = {
		id: id,
		username: formData.get("username")?.toString(),
		image: formData.get("image")?.toString() || null,
		teamId: formData.get("teamId")?.toString() || null,
		priority: formData.get("priority")?.toString() || 0,
	};

	const result = schema.safeParse(data);
	if (!result.success) {
		return { message: z.prettifyError(result.error) };
	}
	try {
		const player = await db.player.findFirst({
			where: { id: result.data.id },
		});
		if (!player) {
			return { message: "Player not found" };
		}
		if (result.data.teamId) {
			const team = await db.team.findFirst({
				where: { id: result.data.teamId },
			});
			if (!team) {
				return { message: "Team not found" };
			}
		}
		await db.player.update({
			where: { id: result.data.id },
			data: result.data,
		});
		return { success: true, message: "Player updated successfully" };
	} catch (e) {
		return { message: "Failed to update player" };
	}
}

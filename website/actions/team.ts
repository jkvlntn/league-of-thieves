"use server";
import db from "@/lib/database";
import z from "zod/v4";
import { validateAdmin } from "@/lib/session";
import { slugify } from "@/lib/util";
import { redirect } from "next/navigation";

export async function addTeam(
	formData: FormData
): Promise<{ success?: boolean; message: string }> {
	if (!validateAdmin()) {
		return { message: "You do not have permission to create a team" };
	}
	const schema = z.object({
		name: z.string().trim().min(1, "Name is required"),
		image: z.url("Image must be a valid URL").optional(),
		motto: z.string().optional(),
	});
	const data = {
		name: formData.get("name")?.toString(),
		image: formData.get("image")?.toString() || undefined,
		motto: formData.get("motto")?.toString() || undefined,
	};
	const result = schema.safeParse(data);
	if (!result.success) {
		return { message: z.prettifyError(result.error) };
	}
	try {
		const existingTeam = await db.team.findFirst({
			where: {
				slugName: slugify(result.data.name),
			},
		});
		if (existingTeam) {
			return { message: "A team with this name already exists" };
		}
		await db.team.create({
			data: { ...result.data, slugName: slugify(result.data.name) },
		});
	} catch (e) {
		return { message: "Failed to create team" };
	}
	return { success: true, message: "Team created successfully" };
}

export async function deleteTeam(id: number): Promise<{ message: string }> {
	if (!validateAdmin()) {
		return { message: "You do not have permission to delete a team" };
	}
	const schema = z.coerce.number().int("Team ID must be an integer");
	const result = schema.safeParse(id);
	if (!result.success) {
		return { message: z.prettifyError(result.error) };
	}
	try {
		const team = await db.team.findFirst({
			where: { id: result.data },
		});
		if (!team) {
			return { message: "Team not found" };
		}
		await db.team.delete({
			where: { id: result.data },
		});
	} catch (e) {
		return { message: "Failed to delete team" };
	}
	redirect("/admin/teams");
}

export async function updateTeam(
	formData: FormData,
	id: number
): Promise<{ success?: boolean; message: string }> {
	if (!validateAdmin()) {
		return { message: "You do not have permission to modify this team" };
	}
	const schema = z.object({
		id: z.coerce.number().int("Team ID must be an integer"),
		name: z.string().trim().min(1, "Name is required"),
		image: z.url("Image must be a valid URL").nullable(),
		motto: z.string().nullable(),
	});
	const data = {
		id: id,
		name: formData.get("name")?.toString(),
		image: formData.get("image")?.toString() || null,
		motto: formData.get("motto")?.toString() || null,
	};
	const result = schema.safeParse(data);
	if (!result.success) {
		return { message: z.prettifyError(result.error) };
	}
	try {
		const team = await db.team.findFirst({
			where: { id: result.data.id },
		});
		if (!team) {
			return { message: "Team not found" };
		}
		await db.team.update({
			where: { id: result.data.id },
			data: { ...result.data, slugName: slugify(result.data.name) },
		});
		return { success: true, message: "Team updated successfully" };
	} catch (e) {
		return { message: "Failed to update team" };
	}
}

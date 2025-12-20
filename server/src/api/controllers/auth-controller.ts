import { asyncHandler } from "../lib/request-handler";
import { HttpError } from "../models/http-error";
import { Authentication } from "@lot/common";
import * as staffService from "../services/staff-service";
import jwt from "jsonwebtoken";
import z from "zod";

const JWT_SECRET: string = process.env.JWT_SECRET!;

export const registerStaff = asyncHandler<Authentication>(
	async (req, res, next) => {
		const activationSchema = z.object({
			username: z.string().min(1),
			activationCode: z.string().min(1),
			password: z.string().min(1),
		});
		const { username, password, activationCode } = activationSchema.parse(
			req.body
		);
		const isActivated = await staffService.activateStaffMember(
			username,
			activationCode,
			password
		);
		if (!isActivated) {
			throw new HttpError(400, "Invalid activation code or username");
		}
		const staff = await staffService.authenticateStaff(username, password);
		if (!staff) {
			throw new HttpError(401, "Authentication failed after activation");
		}
		const token = jwt.sign(
			{
				id: staff.id,
				username: staff.username,
				permissions: staff.permissions,
			},
			JWT_SECRET,
			{ expiresIn: "7d" }
		);
		return {
			message: "Staff member activated successfully",
			status: 200,
			data: {
				token,
			},
		};
	}
);

export const loginStaff = asyncHandler<Authentication>(
	async (req, res, next) => {
		const loginSchema = z.object({
			username: z.string().min(1),
			password: z.string().min(1),
		});
		const { username, password } = loginSchema.parse(req.body);
		const staff = await staffService.authenticateStaff(
			username,
			await password
		);
		if (!staff) {
			throw new HttpError(401, "Invalid username or password");
		}
		const token = jwt.sign(
			{
				id: staff.id,
				username: staff.username,
				permissions: staff.permissions,
			},
			JWT_SECRET,
			{ expiresIn: "7d" }
		);
		return {
			message: "Login successful",
			status: 200,
			data: {
				token,
			},
		};
	}
);

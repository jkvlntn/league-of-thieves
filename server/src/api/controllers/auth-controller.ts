import { asyncHandler } from "../lib/request-handler";
import { HttpError } from "../models/http-error";
import { Authentication, Staff } from "@lot/common";
import * as staffService from "../services/staff-service";
import * as jwtService from "../services/jwt-service";
import z from "zod";

export const getLoggedInStaff = asyncHandler<Staff>(async (req, res, next) => {
	const staffId = req.staffId;
	if (!staffId) {
		throw new HttpError(401, "No staff member found");
	}
	const staff = await staffService.getStaffMember(staffId);
	if (!staff) {
		throw new HttpError(401, "Staff member not found");
	}
	return {
		message: "Logged in staff member retrieved successfully",
		status: 200,
		data: staff,
	};
});

export const activateStaff = asyncHandler<Authentication>(
	async (req, res, next) => {
		const activationSchema = z.object({
			username: z.string().min(1),
			activationCode: z.string().min(1),
			password: z.string().min(1),
		});
		const { username, password, activationCode } = activationSchema.parse(
			req.body,
		);
		const isActivated = await staffService.activateStaffMember(
			username,
			activationCode,
			password,
		);
		if (!isActivated) {
			throw new HttpError(400, "Invalid activation code or username");
		}
		const staff = await staffService.authenticateStaff(username, password);
		if (!staff) {
			throw new HttpError(401, "Authentication failed after activation");
		}
		const token = jwtService.signToken({ id: staff.id });
		return {
			message: "Staff member activated successfully",
			status: 200,
			data: {
				token,
			},
		};
	},
);

export const loginStaff = asyncHandler<Authentication>(
	async (req, res, next) => {
		const loginSchema = z.object({
			username: z.string().min(1),
			password: z.string().min(1),
		});
		const { username, password } = loginSchema.parse(req.body);
		const staff = await staffService.authenticateStaff(username, password);
		if (!staff) {
			throw new HttpError(401, "Invalid username or password");
		}
		const token = jwtService.signToken({ id: staff.id });
		return {
			message: "Login successful",
			status: 200,
			data: {
				token,
			},
		};
	},
);

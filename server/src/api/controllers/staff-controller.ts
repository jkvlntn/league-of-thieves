import { asyncHandler } from "../lib/request-handler";
import * as z from "zod";
import { Staff, StaffActivation, StaffPermissionName } from "@lot/common";
import * as staffService from "../services/staff-service";
import { HttpError } from "../models/http-error";
import { parseId } from "../../lib/utils";

export const getStaff = asyncHandler<Staff[]>(async (req, res, next) => {
	return {
		message: "Staff retrieved successfully",
		status: 200,
		data: await staffService.getAllStaff(),
	};
});

export const createStaff = asyncHandler<Staff>(async (req, res, next) => {
	const staffSchema = z.object({
		username: z.string().min(1),
		permissions: z.array(z.enum(StaffPermissionName)),
	});

	const validStaffData = staffSchema.parse(req.body);
	if (await staffService.doesStaffExist(validStaffData.username)) {
		throw new HttpError(409, "Staff member with this username already exists");
	}
	const staffId = await staffService.createStaffMember(validStaffData);
	const createdStaff = await staffService.getStaffMember(staffId);
	if (!createdStaff) {
		throw new HttpError(500, "Failed to retrieve newly created staff");
	}
	return {
		message: "Staff member created successfully",
		status: 201,
		data: createdStaff,
	};
});

export const updateStaff = asyncHandler<Staff>(async (req, res, next) => {
	const staffSchema = z.object({
		username: z.string().min(1),
		permissions: z.array(z.enum(StaffPermissionName)),
	});
	const staffId = parseId(req.params.id);
	const exists = await staffService.doesStaffExist(staffId);
	if (!exists) {
		throw new HttpError(404, "Staff not found");
	}
	const validStaffData = staffSchema.parse(req.body);
	const staffWithSameUsernameExists = await staffService.doesStaffExist(
		validStaffData.username
	);
	if (staffWithSameUsernameExists) {
		const existingStaff = await staffService.getStaffMember(
			validStaffData.username
		);
		if (existingStaff && existingStaff.id !== staffId) {
			throw new HttpError(
				400,
				"A staff member with this username already exists"
			);
		}
	}
	const updatedStaffId = await staffService.updateStaffMember(
		staffId,
		validStaffData
	);
	const updatedStaff = await staffService.getStaffMember(updatedStaffId);
	if (!updatedStaff) {
		throw new HttpError(500, "Failed to retrieve updated player");
	}
	return {
		message: "Player updated successfully",
		status: 200,
		data: updatedStaff,
	};
});

export const deleteStaff = asyncHandler<void>(async (req, res, next) => {
	const staffId = parseId(req.params.id);
	const exists = await staffService.doesStaffExist(staffId);
	if (!exists) {
		throw new HttpError(404, "Staff not found");
	}
	await staffService.deleteStaffMember(staffId);
	return {
		message: "Staff deleted successfully",
		status: 200,
		data: undefined,
	};
});

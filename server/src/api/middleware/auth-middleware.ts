import { asyncMiddlewareHandler } from "../lib/request-handler";
import { HttpError } from "../models/http-error";
import { StaffPermissionName } from "@lot/common";
import * as jwtService from "../services/jwt-service";
import * as staffService from "../services/staff-service";

export const getStaffId = asyncMiddlewareHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new HttpError(401, "Unauthorized: Header missing or malformed");
	}
	const token = authHeader.split(" ")[1];
	try {
		const payload = jwtService.verifyToken(token);
		req.staffId = payload.id;
		next();
	} catch (err) {
		throw new HttpError(401, "Unauthorized: Invalid or expired token");
	}
});

export const hasStaffPermissions = (
	...requiredPermissions: StaffPermissionName[]
) => {
	return asyncMiddlewareHandler(async (req, res, next) => {
		const staffId = req.staffId;
		if (!staffId) {
			throw new HttpError(401, "Unauthorized: No staff member found");
		}
		const staff = await staffService.getStaffMember(staffId);
		if (!staff) {
			throw new HttpError(401, "Unauthorized: Staff member not found");
		}
		if (!staff.isActive) {
			throw new HttpError(401, "Unauthorized: Staff member not activated");
		}
		const userPermissions = staff.permissions;
		const hasAllPermissions = requiredPermissions.every((permission) =>
			userPermissions.includes(permission),
		);
		if (!hasAllPermissions) {
			throw new HttpError(403, "Unauthorized: Insufficient permissions");
		}
		next();
	});
};

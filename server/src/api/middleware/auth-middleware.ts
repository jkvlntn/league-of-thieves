import { asyncMiddlewareHandler } from "../lib/request-handler";
import { HttpError } from "../models/http-error";
import jwt from "jsonwebtoken";
import { StaffPermissionName, UserRoles } from "@lot/common";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticate = asyncMiddlewareHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new HttpError(401, "Authorization header missing or malformed");
	}
	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.staffMember = decoded as {
			id: number;
			username: string;
			permissions: StaffPermissionName[];
		};
		next();
	} catch {
		throw new HttpError(401, "Invalid or expired token");
	}
});

export const hasStaffPermissions = (
	...requiredPermissions: StaffPermissionName[]
) => {
	return asyncMiddlewareHandler(async (req, res, next) => {
		if (!req.staffMember) {
			throw new HttpError(401, "Unauthorized");
		}
		const userPermissions = req.staffMember.permissions;
		const hasAllPermissions = requiredPermissions.every((permission) =>
			userPermissions.includes(permission)
		);
		if (!hasAllPermissions) {
			throw new HttpError(403, "Forbidden: Insufficient permissions");
		}
		next();
	});
};

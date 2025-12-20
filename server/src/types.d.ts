import { StaffPermissionName } from "@lot/common";
import { Request } from "express";

declare global {
	namespace Express {
		interface Request {
			selectedColors?: Array<BotColor>;
			staffMember?: {
				id: number;
				username: string;
				permissions: StaffPermissionName[];
			};
		}
	}
}

import { StaffPermissionName } from "../enums/staff-permission";

export interface Staff {
	id: number;
	username: string;
	permissions: StaffPermissionName[];
	isActive: boolean;
}

export interface StaffActivation {
	username: string;
	activationCode: string;
}

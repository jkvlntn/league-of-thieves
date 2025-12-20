import {
	Staff,
	StaffPermissionName,
	StaffActivation,
	CreateStaffDTO,
} from "@lot/common";
import { orm } from "../../lib/database";
import { checkPassword, generatePassword, hashPassword } from "../../lib/utils";

export async function getAllStaff(): Promise<Staff[]> {
	const staffData = await orm.staff.findMany({
		select: {
			id: true,
			username: true,
			activationCode: true,
			permissions: { select: { permissionName: true } },
		},
		orderBy: { username: "asc" },
	});

	return staffData.map((staff) => {
		return {
			id: staff.id,
			username: staff.username,
			isActive: staff.activationCode === null,
			permissions: staff.permissions.map(
				(permission) => permission.permissionName as StaffPermissionName
			),
		};
	});
}

export async function getStaffMember(username: string): Promise<Staff | null>;
export async function getStaffMember(staffId: number): Promise<Staff | null>;
export async function getStaffMember(
	staffIdentifier: string | number
): Promise<Staff | null> {
	const staffData =
		typeof staffIdentifier === "number"
			? await orm.staff.findUnique({
					select: {
						id: true,
						username: true,
						activationCode: true,
						permissions: { select: { permissionName: true } },
					},
					where: { id: staffIdentifier },
			  })
			: await orm.staff.findUnique({
					select: {
						id: true,
						username: true,
						activationCode: true,
						permissions: { select: { permissionName: true } },
					},
					where: { username: staffIdentifier },
			  });
	if (!staffData) {
		return null;
	}
	return {
		id: staffData.id,
		username: staffData.username,
		isActive: staffData.activationCode === null,
		permissions: staffData.permissions.map(
			(permission) => permission.permissionName as StaffPermissionName
		),
	};
}

export async function doesStaffExist(username: string): Promise<boolean>;
export async function doesStaffExist(staffId: number): Promise<boolean>;
export async function doesStaffExist(
	staffIdentifier: string | number
): Promise<boolean> {
	const staff =
		typeof staffIdentifier === "number"
			? await orm.staff.findUnique({
					select: { id: true },
					where: { id: staffIdentifier },
			  })
			: await orm.staff.findUnique({
					select: { id: true },
					where: { username: staffIdentifier },
			  });
	return !!staff;
}

export async function authenticateStaff(
	username: string,
	password: string
): Promise<Staff | null> {
	console.log(password);
	const staff = await orm.staff.findUnique({
		select: {
			id: true,
			username: true,
			password: true,
			activationCode: true,
			permissions: { select: { permissionName: true } },
		},
		where: {
			username,
			activationCode: null,
		},
	});
	if (!staff || !(await checkPassword(password, staff.password))) {
		return null;
	}
	return {
		id: staff.id,
		username: staff.username,
		isActive: staff.activationCode === null,
		permissions: staff.permissions.map(
			(permission) => permission.permissionName as StaffPermissionName
		),
	};
}

export async function isStaffActivated(username: string): Promise<boolean>;
export async function isStaffActivated(staffId: number): Promise<boolean>;
export async function isStaffActivated(
	staffIdentifier: string | number
): Promise<boolean> {
	const staff =
		typeof staffIdentifier === "number"
			? await orm.staff.findUnique({
					select: { id: true, activationCode: true },
					where: { id: staffIdentifier },
			  })
			: await orm.staff.findUnique({
					select: { id: true, activationCode: true },
					where: { username: staffIdentifier },
			  });
	if (!staff) {
		return false;
	}
	return staff.activationCode === null;
}

export async function createStaffMember(staffData: {
	username: string;
	permissions?: StaffPermissionName[];
}): Promise<number> {
	const activationCode = generatePassword(5);
	const newStaff = await orm.staff.create({
		data: {
			username: staffData.username,
			activationCode,
			permissions: {
				createMany: {
					data:
						staffData.permissions?.map((permission) => ({
							permissionName: permission,
						})) || [],
				},
			},
		},
	});
	return newStaff.id;
}

export async function updateStaffMember(
	staffId: number,
	staffData: {
		username?: string;
		permissions?: StaffPermissionName[];
	}
): Promise<number> {
	const updatedId = await orm.$transaction(async (tx) => {
		const updatedStaff = await tx.staff.update({
			data: {
				username: staffData.username,
			},
			where: { id: staffId },
		});
		const currentPermissions = (
			await tx.staffPermission.findMany({
				select: { permissionName: true },
				where: { staffId },
			})
		).map((p) => p.permissionName as StaffPermissionName);
		const toAdd = staffData.permissions?.filter(
			(p) => !currentPermissions.includes(p)
		);
		const toRemove = currentPermissions.filter(
			(p) => !staffData.permissions?.includes(p)
		);
		if (toAdd && toAdd.length > 0) {
			await tx.staffPermission.createMany({
				data: toAdd.map((permission) => ({
					staffId,
					permissionName: permission,
				})),
				skipDuplicates: true,
			});
		}
		if (toRemove.length > 0) {
			await tx.staffPermission.deleteMany({
				where: {
					staffId,
					permissionName: { in: toRemove },
				},
			});
		}
		return updatedStaff.id;
	});
	return updatedId;
}

export async function deleteStaffMember(staffId: number): Promise<void> {
	await orm.staff.delete({ where: { id: staffId } });
}

export async function resetStaffActivation(
	staffId: number
): Promise<StaffActivation> {
	const activationCode = generatePassword(5);
	const staffData = await orm.staff.update({
		data: { activationCode },
		where: { id: staffId },
	});
	return {
		username: staffData.username,
		activationCode: staffData.activationCode!,
	};
}

export async function activateStaffMember(
	username: string,
	attemptedCode: string,
	newPassword: string
): Promise<boolean> {
	const staffData = await orm.staff.findUnique({
		where: { username: username, activationCode: attemptedCode },
	});
	if (!staffData) {
		return false;
	}
	await orm.staff.update({
		data: { password: await hashPassword(newPassword), activationCode: null },
		where: { id: staffData.id },
	});
	return true;
}

import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { StaffPermissionName, type Staff } from "@lot/common";
import { Input, Button, Checkbox } from "../components/Form";
import {
	Table,
	TableBody,
	TableCell,
	TableHeaderCell,
	TableHead,
	TableRow,
	TableActionsCell,
} from "../components/Table";
import Modal from "../components/Modal";
import { toast } from "react-hot-toast";
import {
	deleteRequest,
	getRequest,
	patchRequest,
	postRequest,
} from "../lib/api";

const permissionLabels: Record<StaffPermissionName, string> = {
	[StaffPermissionName.MANAGE_PLAYERS]: "Manage Players",
	[StaffPermissionName.MANAGE_TEAMS]: "Manage Teams",
	[StaffPermissionName.REFEREE_MATCHES]: "Referee Matches",
	[StaffPermissionName.MANAGE_STAFF]: "Manage Staff",
};

function StaffPage() {
	const [staff, setStaff] = useState<Staff[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [search, setSearch] = useState("");
	const [modalType, setModalType] = useState<
		"create" | "edit" | "delete" | null
	>(null);
	const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
	const [staffFormFields, setStaffFormFields] = useState<{
		username: string;
		permissions: StaffPermissionName[];
	}>({
		username: "",
		permissions: [],
	});

	const filteredStaff = staff.filter((staff) =>
		staff.username.toLowerCase().includes(search.toLowerCase())
	);

	useEffect(() => {
		fetchStaff();
	}, []);

	async function fetchStaff() {
		try {
			const staff = await getRequest<Staff[]>("/staff");
			setStaff(staff.data);
			setLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function createStaff(e: React.FormEvent) {
		e.preventDefault();
		try {
			const responseJson = await postRequest<void>("/staff", {
				username: staffFormFields.username || undefined,
				permissions: staffFormFields.permissions,
			});
			setModalType(null);
			fetchStaff();
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function editStaff(e: React.FormEvent) {
		e.preventDefault();
		if (!selectedStaff) return;
		const staffId = selectedStaff.id;
		try {
			const responseJson = await patchRequest<void>("/staff/" + staffId, {
				username: staffFormFields.username || null,
				permissions: staffFormFields.permissions,
			});
			setModalType(null);
			fetchStaff();
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function deleteStaff() {
		if (!selectedStaff) return;
		const staffId = selectedStaff.id;
		try {
			const responseJson = await deleteRequest<void>("/staff/" + staffId);
			setModalType(null);
			fetchStaff();
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	function updateStaffFormField(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setStaffFormFields({ ...staffFormFields, [name]: value });
	}

	return (
		<>
			{modalType === "create" && (
				<Modal
					title="Create Staff"
					onClose={() => {
						setModalType(null);
					}}
				>
					<form className="flex flex-col gap-4">
						<Input
							type="text"
							name="username"
							placeholder="Username"
							value={staffFormFields.username}
							onChange={updateStaffFormField}
						/>
						<div className="flex flex-wrap">
							{Object.values(StaffPermissionName).map((permission, idx) => (
								<div className="flex w-1/2 gap-2 mb-1.5">
									<Checkbox
										key={idx}
										className="border-gray-700"
										color="bg-gray-700"
										checked={staffFormFields.permissions.includes(permission)}
										onChange={() => {
											if (staffFormFields.permissions.includes(permission)) {
												setStaffFormFields({
													...staffFormFields,
													permissions: staffFormFields.permissions.filter(
														(p) => p !== permission
													),
												});
											} else {
												setStaffFormFields({
													...staffFormFields,
													permissions: [
														...staffFormFields.permissions,
														permission,
													],
												});
											}
										}}
									/>
									<div>{permissionLabels[permission]}</div>
								</div>
							))}
						</div>
						<div className="flex flex-row-reverse gap-2">
							<Button onClick={createStaff}>Confirm</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setModalType(null);
								}}
							>
								Cancel
							</Button>
						</div>
					</form>
				</Modal>
			)}

			{modalType === "delete" && selectedStaff && (
				<Modal
					title="Confirm Staff Deletion"
					onClose={() => {
						setModalType(null);
						setSelectedStaff(null);
					}}
				>
					<div className="flex flex-col gap-4">
						<div>
							Are you sure you want to delete {selectedStaff.username}? This
							action cannot be undone.
						</div>
						<div className="flex flex-row-reverse gap-2">
							<Button onClick={deleteStaff}>Confirm</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setModalType(null);
									setSelectedStaff(null);
								}}
							>
								Cancel
							</Button>
						</div>
					</div>
				</Modal>
			)}
			{modalType === "edit" && selectedStaff && (
				<Modal
					title="Edit Staff"
					onClose={() => {
						setModalType(null);
						setSelectedStaff(null);
					}}
				>
					<form className="flex flex-col gap-4">
						<Input
							type="text"
							name="username"
							placeholder="Username"
							value={staffFormFields.username}
							onChange={updateStaffFormField}
						/>
						<div className="flex flex-wrap">
							{Object.values(StaffPermissionName).map((permission, idx) => (
								<div className="flex w-1/2 gap-2 mb-1.5">
									<Checkbox
										key={idx}
										className="border-gray-700"
										color="bg-gray-700"
										checked={staffFormFields.permissions.includes(permission)}
										onChange={() => {
											if (staffFormFields.permissions.includes(permission)) {
												setStaffFormFields({
													...staffFormFields,
													permissions: staffFormFields.permissions.filter(
														(p) => p !== permission
													),
												});
											} else {
												setStaffFormFields({
													...staffFormFields,
													permissions: [
														...staffFormFields.permissions,
														permission,
													],
												});
											}
										}}
									/>
									<div>{permissionLabels[permission]}</div>
								</div>
							))}
						</div>

						<div className="flex flex-row-reverse gap-2">
							<Button onClick={editStaff}>Confirm</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setModalType(null);
									setSelectedStaff(null);
								}}
							>
								Cancel
							</Button>
						</div>
					</form>
				</Modal>
			)}

			<div className="flex flex-col gap-4 w-full h-full">
				<div className="text-3xl">Manage Staff</div>
				<div className="flex justify-between ">
					<Input
						className="w-1/2"
						placeholder="Search Staff..."
						type="text"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
					<Button
						variant="primary"
						onClick={() => {
							setModalType("create");
							setStaffFormFields({
								username: "",
								permissions: [],
							});
						}}
					>
						Create Staff
					</Button>
				</div>
				<div className="h-full">
					{loading && <Loading />}
					{!loading && filteredStaff.length === 0 && <div>No staff found.</div>}
					{!loading && filteredStaff.length > 0 && (
						<Table>
							<TableHead>
								<TableRow>
									<TableHeaderCell>Username</TableHeaderCell>
									<TableHeaderCell>Status</TableHeaderCell>
									<TableHeaderCell></TableHeaderCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredStaff.map((staff) => (
									<TableRow key={staff.id}>
										<TableCell>{staff.username}</TableCell>
										<TableCell>
											{staff.isActive ? "Active" : "Inactive"}
										</TableCell>
										<TableActionsCell
											onDelete={() => {
												setSelectedStaff(staff);
												setModalType("delete");
											}}
											onEdit={() => {
												setSelectedStaff(staff);
												setStaffFormFields({
													username: staff.username,
													permissions: staff.permissions,
												});
												setModalType("edit");
											}}
										></TableActionsCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</div>
			</div>
		</>
	);
}

export default StaffPage;

import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import type { Team } from "@lot/common";
import { Input, Button } from "../components/Form";
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

function TeamsPage() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [search, setSearch] = useState("");
	const [modalType, setModalType] = useState<
		"create" | "edit" | "delete" | null
	>(null);
	const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
	const [teamFormFields, setTeamFormFields] = useState<{
		name: string;
		image: string;
		motto: string;
		discordRole: string;
	}>({
		name: "",
		image: "",
		motto: "",
		discordRole: "",
	});

	const filteredTeams = teams.filter((team) =>
		team.name.toLowerCase().includes(search.toLowerCase())
	);

	useEffect(() => {
		fetchTeams();
	}, []);

	async function fetchTeams() {
		try {
			const teams = await getRequest<Team[]>("/teams");
			setTeams(teams.data);
			setLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function createTeam(e: React.FormEvent) {
		e.preventDefault();
		try {
			const responseJson = await postRequest<void>("/teams", {
				name: teamFormFields.name || undefined,
				image: teamFormFields.image || undefined,
				motto: teamFormFields.motto || undefined,
				discordRole: teamFormFields.discordRole || undefined,
			});
			setModalType(null);
			fetchTeams();
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function editTeam(e: React.FormEvent) {
		e.preventDefault();
		if (!selectedTeam) return;
		const teamId = selectedTeam.id;
		try {
			const responseJson = await patchRequest<void>("/teams/" + teamId, {
				name: teamFormFields.name || null,
				image: teamFormFields.image || null,
				motto: teamFormFields.motto || null,
				discordRole: teamFormFields.discordRole || null,
			});
			setModalType(null);
			fetchTeams();
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function deleteTeam() {
		if (!selectedTeam) return;
		const teamId = selectedTeam.id;
		try {
			const responseJson = await deleteRequest<void>("/teams/" + teamId);
			setModalType(null);
			fetchTeams();
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	function updateTeamFormField(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setTeamFormFields({ ...teamFormFields, [name]: value });
	}

	return (
		<>
			{modalType === "create" && (
				<Modal
					title="Create Team"
					onClose={() => {
						setModalType(null);
					}}
				>
					<form className="flex flex-col gap-4">
						<Input
							type="text"
							name="name"
							placeholder="Team Name"
							value={teamFormFields.name}
							onChange={updateTeamFormField}
						/>
						<Input
							type="text"
							name="motto"
							placeholder="Team Motto"
							value={teamFormFields.motto}
							onChange={updateTeamFormField}
						/>
						<Input
							type="text"
							name="image"
							placeholder="Team Logo"
							value={teamFormFields.image}
							onChange={updateTeamFormField}
						/>
						<Input
							type="text"
							name="discordRole"
							placeholder="Discord Role ID"
							value={teamFormFields.discordRole}
							onChange={updateTeamFormField}
						/>
						<div className="flex flex-row-reverse gap-2">
							<Button onClick={createTeam}>Confirm</Button>
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

			{modalType === "delete" && selectedTeam && (
				<Modal
					title="Confirm Team Deletion"
					onClose={() => {
						setModalType(null);
						setSelectedTeam(null);
					}}
				>
					<div className="flex flex-col gap-4">
						<div>
							Are you sure you want to delete {selectedTeam.name}? This action
							cannot be undone.
						</div>
						<div className="flex flex-row-reverse gap-2">
							<Button onClick={deleteTeam}>Confirm</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setModalType(null);
									setSelectedTeam(null);
								}}
							>
								Cancel
							</Button>
						</div>
					</div>
				</Modal>
			)}
			{modalType === "edit" && selectedTeam && (
				<Modal
					title="Edit Team"
					onClose={() => {
						setModalType(null);
						setSelectedTeam(null);
					}}
				>
					<form className="flex flex-col gap-4">
						<Input
							type="text"
							name="name"
							placeholder="Team Name"
							value={teamFormFields.name}
							onChange={updateTeamFormField}
						/>
						<Input
							type="text"
							name="motto"
							placeholder="Team Motto"
							value={teamFormFields.motto}
							onChange={updateTeamFormField}
						/>
						<Input
							type="text"
							name="image"
							placeholder="Team Logo"
							value={teamFormFields.image}
							onChange={updateTeamFormField}
						/>
						<Input
							type="text"
							name="discordRole"
							placeholder="Discord Role ID"
							value={teamFormFields.discordRole}
							onChange={updateTeamFormField}
						/>
						<div className="flex flex-row-reverse gap-2">
							<Button onClick={editTeam}>Confirm</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setModalType(null);
									setSelectedTeam(null);
								}}
							>
								Cancel
							</Button>
						</div>
					</form>
				</Modal>
			)}

			<div className="flex flex-col gap-4 w-full h-full">
				<div className="text-3xl">Manage Teams</div>
				<div className="flex justify-between ">
					<Input
						className="w-1/2"
						placeholder="Search Teams..."
						type="text"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
					<Button
						variant="primary"
						onClick={() => {
							setModalType("create");
							setTeamFormFields({
								name: "",
								image: "",
								motto: "",
								discordRole: "",
							});
						}}
					>
						Create Team
					</Button>
				</div>
				<div className="h-full">
					{loading && <Loading />}
					{!loading && filteredTeams.length === 0 && <div>No teams found.</div>}
					{!loading && filteredTeams.length > 0 && (
						<Table>
							<TableHead>
								<TableRow>
									<TableHeaderCell></TableHeaderCell>
									<TableHeaderCell>Name</TableHeaderCell>
									<TableHeaderCell>Discord Role</TableHeaderCell>
									<TableHeaderCell></TableHeaderCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredTeams.map((team) => (
									<TableRow key={team.id}>
										<TableCell>
											<img
												src={team.image || ""}
												className="w-25 aspect-square object-cover"
											/>
										</TableCell>
										<TableCell>{team.name}</TableCell>
										<TableCell>{team.discordRole || "None"}</TableCell>
										<TableActionsCell
											onDelete={() => {
												setSelectedTeam(team);
												setModalType("delete");
											}}
											onEdit={() => {
												setSelectedTeam(team);
												setTeamFormFields({
													name: team.name,
													image: team.image || "",
													motto: team.motto || "",
													discordRole: team.discordRole || "",
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

export default TeamsPage;

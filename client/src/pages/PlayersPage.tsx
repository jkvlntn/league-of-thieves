import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import type { Player, Team } from "@lot/common";
import { Input, Button, Select } from "../components/Form";
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

function PlayersPage() {
	const [players, setPlayers] = useState<Player[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [search, setSearch] = useState("");
	const [modalType, setModalType] = useState<
		"create" | "edit" | "delete" | null
	>(null);
	const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
	const [playerFormFields, setPlayerFormFields] = useState<{
		username: string;
		image: string;
		teamId: number | "";
		priority: string;
	}>({
		username: "",
		image: "",
		teamId: "",
		priority: "",
	});
	const [assignableTeams, setAssignableTeams] = useState<Team[]>([]);
	const [sortBy, setSortyBy] = useState<"username" | "team" | "id">("username");

	const filteredPlayers = players.filter(
		(player) =>
			player.username.toLowerCase().includes(search.toLowerCase()) ||
			(player.teamName || "Free Agent")
				.toLowerCase()
				.includes(search.toLowerCase())
	);

	useEffect(() => {
		fetchPlayers();
		fetchAssignableTeams();
	}, []);

	async function fetchPlayers() {
		try {
			const players = await getRequest<Player[]>("/players");
			setPlayers(players.data);
			setLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function fetchAssignableTeams() {
		try {
			const assignableTeams = await getRequest<Team[]>("/teams");
			setAssignableTeams(assignableTeams.data);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function createPlayer(e: React.FormEvent) {
		e.preventDefault();
		try {
			const responseJson = await postRequest<void>("/players", {
				username: playerFormFields.username || undefined,
				image: playerFormFields.image || undefined,
				teamId: playerFormFields.teamId || undefined,
				priority: Number(playerFormFields.priority) || undefined,
			});
			setModalType(null);
			fetchPlayers();
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function editPlayer(e: React.FormEvent) {
		e.preventDefault();
		if (!selectedPlayer) return;
		const playerId = selectedPlayer.id;
		try {
			const responseJson = await patchRequest<void>("/players/" + playerId, {
				username: playerFormFields.username || null,
				image: playerFormFields.image || null,
				teamId: playerFormFields.teamId || null,
				priority: Number(playerFormFields.priority) || 0,
			});
			setModalType(null);
			fetchPlayers();
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	async function deletePlayer() {
		if (!selectedPlayer) return;
		const playerId = selectedPlayer.id;
		try {
			const responseJson = await deleteRequest<void>("/players/" + playerId);
			setModalType(null);
			fetchPlayers();
			toast.success(responseJson.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}

	function updatePlayerFormField(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) {
		const { name, value } = e.target;
		console.log(value);
		setPlayerFormFields({ ...playerFormFields, [name]: value });
	}

	return (
		<>
			{modalType === "create" && (
				<Modal
					title="Create Player"
					onClose={() => {
						setModalType(null);
					}}
				>
					<form className="flex flex-col gap-4">
						<Input
							type="text"
							name="username"
							placeholder="Username"
							value={playerFormFields.username}
							onChange={updatePlayerFormField}
						/>
						<Input
							type="text"
							name="image"
							placeholder="Pirate Image"
							value={playerFormFields.image}
							onChange={updatePlayerFormField}
						/>
						<Select
							name="teamId"
							value={playerFormFields.teamId}
							onChange={updatePlayerFormField}
						>
							<option value="">Free Agent</option>
							{assignableTeams.map((team) => (
								<option key={team.id} value={team.id}>
									{team.name}
								</option>
							))}
						</Select>
						<Input
							type="number"
							name="priority"
							placeholder="Priority"
							value={playerFormFields.priority}
							onChange={updatePlayerFormField}
						/>
						<div className="flex flex-row-reverse gap-2">
							<Button onClick={createPlayer}>Confirm</Button>
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

			{modalType === "delete" && selectedPlayer && (
				<Modal
					title="Confirm Player Deletion"
					onClose={() => {
						setModalType(null);
						setSelectedPlayer(null);
					}}
				>
					<div className="flex flex-col gap-4">
						<div>
							Are you sure you want to delete {selectedPlayer.username}? This
							action cannot be undone.
						</div>
						<div className="flex flex-row-reverse gap-2">
							<Button onClick={deletePlayer}>Confirm</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setModalType(null);
									setSelectedPlayer(null);
								}}
							>
								Cancel
							</Button>
						</div>
					</div>
				</Modal>
			)}
			{modalType === "edit" && selectedPlayer && (
				<Modal
					title="Edit Player"
					onClose={() => {
						setModalType(null);
						setSelectedPlayer(null);
					}}
				>
					<form className="flex flex-col gap-4">
						<Input
							type="text"
							name="username"
							placeholder="Username"
							value={playerFormFields.username}
							onChange={updatePlayerFormField}
						/>
						<Input
							type="text"
							name="image"
							placeholder="Pirate Image"
							value={playerFormFields.image}
							onChange={updatePlayerFormField}
						/>
						<Select
							name="teamId"
							value={playerFormFields.teamId}
							onChange={updatePlayerFormField}
						>
							<option value="">Free Agent</option>
							{assignableTeams.map((team) => (
								<option key={team.id} value={team.id}>
									{team.name}
								</option>
							))}
						</Select>
						<Input
							type="text"
							name="priority"
							placeholder="Priority"
							value={playerFormFields.priority}
							onChange={updatePlayerFormField}
						/>
						<div className="flex flex-row-reverse gap-2">
							<Button onClick={editPlayer}>Confirm</Button>
							<Button
								variant="secondary"
								onClick={() => {
									setModalType(null);
									setSelectedPlayer(null);
								}}
							>
								Cancel
							</Button>
						</div>
					</form>
				</Modal>
			)}

			<div className="flex flex-col gap-4 w-full h-full">
				<div className="text-3xl">Manage Players</div>
				<div className="flex justify-between ">
					<Input
						className="w-1/2"
						placeholder="Search Players..."
						type="text"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
					<Button
						variant="primary"
						onClick={() => {
							setModalType("create");
							setPlayerFormFields({
								username: "",
								image: "",
								teamId: "",
								priority: "",
							});
						}}
					>
						Create Player
					</Button>
				</div>
				<div className="h-full">
					{loading && <Loading />}
					{!loading && filteredPlayers.length === 0 && (
						<div>No players found.</div>
					)}
					{!loading && filteredPlayers.length > 0 && (
						<Table>
							<TableHead>
								<TableRow>
									<TableHeaderCell></TableHeaderCell>
									<TableHeaderCell>Username</TableHeaderCell>
									<TableHeaderCell>Team</TableHeaderCell>
									<TableHeaderCell>Priority</TableHeaderCell>
									<TableHeaderCell></TableHeaderCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredPlayers.map((player) => (
									<TableRow key={player.id}>
										<TableCell>
											<div className="w-25 h-25 rounded-full overflow-hidden">
												<img
													src={player.image || "default-pirate.png"}
													className="w-full h-full object-cover object-[center_-20%] scale-130"
												/>
											</div>
										</TableCell>
										<TableCell>{player.username}</TableCell>
										<TableCell>{player.teamName || "Free Agent"}</TableCell>
										<TableCell>{player.priority}</TableCell>
										<TableActionsCell
											onDelete={() => {
												setSelectedPlayer(player);
												setModalType("delete");
											}}
											onEdit={() => {
												setSelectedPlayer(player);
												setPlayerFormFields({
													username: player.username,
													image: player.image || "",
													teamId: player.teamId || "",
													priority: player.priority.toString(),
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

export default PlayersPage;

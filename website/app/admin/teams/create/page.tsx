import AddTeamForm from "@/components/admin/AddTeamForm";

export default async function AddTeamPage() {
	return (
		<div className="min-h-[calc(100vh-9rem)] flex flex-col gap-5 items-center w-full">
			<div className="text-xl">Create Team</div>
			<AddTeamForm />
		</div>
	);
}

import db from "@/lib/database";
import { redirect } from "next/navigation";
import UpdateTeamForm from "@/components/admin/UpdateTeamForm";
import DeleteTeamForm from "@/components/admin/DeleteTeamForm";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function ManageTeamPage({ params }: Props) {
	const id = parseInt((await params).id);
	if (isNaN(id)) {
		redirect("/admin/teams");
	}
	const team = await db.team.findFirst({ where: { id: id } });
	if (!team) {
		redirect("/admin/teams");
	}

	return (
		<div className="min-h-[calc(100vh-9rem)] flex flex-col gap-5 items-center w-full">
			<div className="text-xl">Edit Team</div>
			<UpdateTeamForm
				id={team.id}
				name={team.name}
				image={team.image || ""}
				motto={team.motto || ""}
			/>
			<DeleteTeamForm id={team.id} />
		</div>
	);
}

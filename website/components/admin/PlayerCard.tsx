import Link from "next/link";
import Button from "@/components/form/Button";

interface Props {
	id: number;
	username: string;
	teamName: string;
}

export default function TeamCard({ id, username, teamName }: Props) {
	return (
		<div className="border-2 p-3 flex flex-col gap-1">
			<div>{username}</div>
			<div>ID: {id}</div>
			<div>Team: {teamName}</div>
			<div className="flex gap-1">
				<Link href={`/admin/players/${id}`}>
					<Button>Manage</Button>
				</Link>
			</div>
		</div>
	);
}

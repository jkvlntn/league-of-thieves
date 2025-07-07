import Link from "next/link";
import Button from "@/components/form/Button";
import { slugify } from "@/lib/util";

interface Props {
	id: number;
	name: string;
	playerCount: number;
}

export default function TeamCard({ id, name, playerCount }: Props) {
	return (
		<div className="border-2 p-3 flex flex-col gap-1">
			<div>{name}</div>
			<div>ID: {id}</div>
			<div>Players: {playerCount}/10</div>
			<div className="flex gap-1">
				<Link href={`/teams/${slugify(name)}`}>
					<Button>View</Button>
				</Link>
				<Link href={`/admin/teams/${id}`}>
					<Button>Edit</Button>
				</Link>
			</div>
		</div>
	);
}

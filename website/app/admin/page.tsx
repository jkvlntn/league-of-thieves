import { validateAdmin } from "@/lib/session";
import Button from "@/components/form/Button";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
	return (
		<div className="min-h-[calc(100vh-9rem)] flex justify-center items-center gap-5">
			<Link href="/admin/teams">
				<Button>Manage Teams</Button>
			</Link>
			<Link href="/admin/players">
				<Button>Manage Players</Button>
			</Link>
			{/* <Link href="/admin/settings">
				<Button>Settings</Button>
			</Link> */}
		</div>
	);
}

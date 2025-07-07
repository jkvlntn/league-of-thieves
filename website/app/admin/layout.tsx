import { redirect } from "next/navigation";
import { validateAdmin } from "@/lib/session";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (!(await validateAdmin())) {
		redirect("/login");
	}
	return <>{children}</>;
}

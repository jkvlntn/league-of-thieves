import { redirect } from "next/navigation";
import { validateRef, validateAdmin } from "@/lib/session";
import LoginForm from "@/components/login/LoginForm";

export default async function LoginPage() {
	if (await validateAdmin()) {
		redirect("/admin");
	}
	if (await validateRef()) {
		redirect("/ref");
	}
	return (
		<div className="min-h-[calc(100vh-9rem)] flex flex-col gap-5 items-center">
			<div className="text-xl">Enter Password to Proceed</div>
			<LoginForm />
		</div>
	);
}

import Button from "@/components/form/Button";
import { logout } from "@/actions/auth";

export default async function LogoutPage() {
	return (
		<div className="min-h-[calc(100vh-9rem)] flex flex-col gap-5 items-center">
			<div className="text-xl">Press to Logout</div>
			<form className="flex flex-col gap-5 w-full max-w-lg" action={logout}>
				<div className="flex justify-center">
					<Button>Logout</Button>
				</div>
			</form>
		</div>
	);
}

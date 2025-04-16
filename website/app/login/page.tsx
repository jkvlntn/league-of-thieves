import { getSession, login } from "@/actions/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
	const session = await getSession();
	if (session.accessLevel) {
		if (session.accessLevel == 1) {
			redirect("/ref");
		} else if (session.accessLevel == 2) {
			redirect("/");
		}
	}
	return (
		<div>
			<form action={login}>
				<input
					className="font-serif"
					type="password"
					name="password"
					placeholder="Password"
				/>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default LoginPage;

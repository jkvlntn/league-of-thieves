import { logout } from "@/actions/auth";
const LogoutPage = () => {
	return (
		<form action={logout}>
			<button type="submit">Logout</button>
		</form>
	);
};

export default LogoutPage;

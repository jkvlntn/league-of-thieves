import { Link, Outlet, useNavigate } from "react-router-dom";
import { Users, User, BicepsFlexed, LogOut, Swords, Home } from "lucide-react";
import { StaffPermissionName, type Staff } from "@lot/common";
import { getRequest } from "../lib/api";
import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

function Layout() {
	const { setAuth, isAuthenticated, permissions } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		validateLoggedInStaff();
	}, [setAuth]);

	async function validateLoggedInStaff() {
		try {
			const response = await getRequest<Staff>("/auth");
			const staffData = response.data;
			setAuth({
				isAuthenticated: true,
				username: staffData.username,
				permissions: staffData.permissions,
			});
		} catch (err) {
			navigate("/login");
		}
	}

	return (
		<div className="bg-[#181a1b] grid grid-cols-[12rem_1fr] min-h-screen">
			{isAuthenticated && (
				<>
					<div className="bg-gray-700 text-white text-xl sticky top-0 h-screen">
						<div className="text-2xl my-8 text-center">Staff Panel</div>
						<div className="p-5 flex flex-col gap-2">
							<Link to="/">
								<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
									<Home />
									Dashboard
								</div>
							</Link>

							{permissions.includes(StaffPermissionName.MANAGE_PLAYERS) && (
								<Link to="players">
									<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
										<User />
										Players
									</div>
								</Link>
							)}
							{permissions.includes(StaffPermissionName.MANAGE_TEAMS) && (
								<Link to="teams">
									<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
										<Users />
										Teams
									</div>
								</Link>
							)}
							{permissions.includes(StaffPermissionName.REFEREE_MATCHES) && (
								<Link to="match">
									<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
										<Swords />
										Match
									</div>
								</Link>
							)}
							{permissions.includes(StaffPermissionName.MANAGE_STAFF) && (
								<Link to="staff">
									<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
										<BicepsFlexed />
										Staff
									</div>
								</Link>
							)}
							<Link to="login">
								<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
									<LogOut />
									Logout
								</div>
							</Link>
						</div>
					</div>
					<div className="p-6 text-white bg-[#181a1b] h-screen overflow-y-auto">
						<Outlet />
					</div>
				</>
			)}
		</div>
	);
}

export default Layout;

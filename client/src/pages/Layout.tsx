import { Link, Outlet } from "react-router-dom";
import {
	Users,
	User,
	BicepsFlexed,
	Settings,
	LogOut,
	Swords,
} from "lucide-react";

function Layout() {
	return (
		<div className="grid grid-cols-[12rem_1fr] h-screen">
			<div className="bg-gray-700 text-white text-xl">
				<div className="text-2xl my-8 text-center">Staff Panel</div>
				<div className="p-5 flex flex-col gap-2">
					<Link to="teams">
						<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
							<Users />
							Teams
						</div>
					</Link>
					<Link to="players">
						<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
							<User />
							Players
						</div>
					</Link>
					<Link to="match">
						<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
							<Swords />
							Match
						</div>
					</Link>
					<Link to="staff">
						<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
							<BicepsFlexed />
							Staff
						</div>
					</Link>

					<Link to="settings">
						<div className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer">
							<Settings />
							Settings
						</div>
					</Link>
					<div
						className="flex items-center gap-3 p-2 w-full transition-colors duration-200 hover:bg-gray-800 text-center rounded cursor-pointer"
						onClick={() => {
							fetch("/api/logout", {
								method: "POST",
								credentials: "include",
							}).then(() => {
								window.location.href = "/login";
							});
						}}
					>
						<LogOut />
						Logout
					</div>
				</div>
			</div>
			<div className="p-6 text-white bg-[#181a1b]">
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;

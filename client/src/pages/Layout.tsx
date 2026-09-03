import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

function Layout() {
	return (
		<div
			className="flex min-h-screen w-full flex-col overflow-y-auto bg-cover bg-center bg-fixed text-white"
			style={{ backgroundImage: "url('/background.png')" }}
		>
			<Nav />
			<main className="flex w-full flex-1 flex-col">
				<div className="mx-auto flex w-full max-w-[1420px] flex-1 flex-col px-5 py-5">
					<Outlet />
				</div>
			</main>
			<footer className="w-full">
				<div className="mx-auto w-full max-w-7xl px-5 pb-5 pt-2">
					<Footer />
				</div>
			</footer>
		</div>
	);
}

export default Layout;

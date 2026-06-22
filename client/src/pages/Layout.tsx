import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Layout() {
	return (
		<div
			className="min-h-screen w-full bg-cover bg-center bg-fixed pt-15"
			style={{ backgroundImage: "url('/background.png')" }}
		>
			<Nav />
			<main className="flex-1 min-h-[calc(100vh-172px)] max-w-[1280px] mx-auto px-3 pt-3 pb-10">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default Layout;

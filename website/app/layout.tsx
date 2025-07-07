import type { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/nav/Nav";
import { main } from "@/lib/fonts";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "League of Thieves",
	description: "",
	icons: {
		icon: "/images/icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`text-white bg-cover bg-center min-h-screen ${main.className}`}
				style={{ backgroundImage: "url('/images/background.png')" }}
			>
				<Nav />
				<div className="max-w-[1280px] mx-auto px-3 pt-18 pb-3">{children}</div>
				<Footer />
			</body>
		</html>
	);
}

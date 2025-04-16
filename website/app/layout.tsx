import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const font = localFont({
	src: "./font.ttf",
});

export const metadata: Metadata = {
	title: "League of Thieves",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>{children}</body>
		</html>
	);
}

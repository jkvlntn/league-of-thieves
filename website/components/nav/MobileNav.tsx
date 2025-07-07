"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
	navLinks: { label: string; href: string }[];
}
export default function MobileNav({ navLinks }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="min-h-15 fixed top-0 w-full z-50 text-lg bg-[#111112]">
			<div className="flex h-15 items-center justify-between px-5">
				<div className="h-full relative w-2/3">
					<Link href={"/"}>
						<Image
							src="/images/title.png"
							alt="League of Thieves"
							fill
							objectFit="contain"
							objectPosition="left"
							quality={100}
						/>
					</Link>
				</div>
				<div
					className="cursor-pointer h-12 w-12 flex flex-col items-center justify-center p-2.5 transform hover:scale-105 transition-all gap-1"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					<span
						className={`block h-0.5 bg-white transition-all duration-300 ease-in-out ${
							isOpen ? "rotate-45 translate-y-1.5 w-full" : "w-full"
						}`}
					></span>
					<span
						className={`block h-0.5 bg-white transition-all duration-300 ease-in-out ${
							isOpen ? "opacity-0" : "w-full"
						}`}
					></span>
					<span
						className={`block h-0.5 bg-white transition-all duration-300 ease-in-out ${
							isOpen ? "-rotate-45 -translate-y-1.5 w-full" : "w-full"
						}`}
					></span>
				</div>
			</div>

			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? "max-h-screen" : "max-h-0"
				}`}
			>
				<div className="flex flex-col w-full gap-3 p-5">
					{navLinks.map((link) => (
						<div key={link.href} className="flex">
							<div
								className="transform hover:scale-105 transition-all cursor-pointer"
								onClick={() => setIsOpen(false)}
							>
								<Link href={link.href}>{link.label}</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

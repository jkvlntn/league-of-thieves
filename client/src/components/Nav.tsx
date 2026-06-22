import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<>
			<div className="hidden lg:block">
				<FullNav />
			</div>
			<div className="lg:hidden">
				<MobileNav />
			</div>
		</>
	);
}

function FullNav() {
	return (
		<div className="text-white px-5 h-15 fixed top-0 w-full z-50 text-lg bg-[#111112]">
			<div className="flex h-full justify-center items-center">
				<div className="h-full w-1/5">
					<Link to="/" className="h-full w-full">
						<img src="/title.png" className="h-full w-full object-contain" />
					</Link>
				</div>
				<div className="w-3/5 flex gap-8 justify-center cursor-pointer">
					<Link to="teams">Teams</Link>
					<Link to="ranked">Ranked</Link>
					<Link to="match">Match</Link>
				</div>
				<div className="w-1/5"></div>
			</div>
		</div>
	);
}

function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="text-white px-5 min-h-15 fixed top-0 w-full z-50 text-lg bg-[#111112]">
			<div className="flex h-15 justify-between items-center">
				<div className="h-full w-2/3 flex justify-start">
					<Link to="/">
						<img src="/title.png" className="h-full w-full object-contain" />
					</Link>
				</div>
				<div className="w-1/3 flex justify-end">
					<div
						className="w-12 h-12 flex flex-col justify-center gap-1 p-2.5 cursor-pointer"
						onClick={() => setIsOpen(!isOpen)}
					>
						<span
							className={`block h-0.5 bg-white transition-all duration-700 ease-in-out w-full ${
								isOpen ? "rotate-45 translate-y-1.5" : ""
							}`}
						></span>
						<span
							className={`block h-0.5 bg-white transition-all duration-700 ease-in-out w-full ${
								isOpen ? "opacity-0" : ""
							}`}
						></span>
						<span
							className={`block h-0.5 bg-white transition-all duration-700 ease-in-out w-full ${
								isOpen ? "-rotate-45 -translate-y-1.5 w-full" : ""
							}`}
						></span>
					</div>
				</div>
			</div>

			<div
				className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${
					isOpen ? "max-h-screen" : "max-h-0"
				}`}
			>
				<div
					className={`py-5 flex flex-col gap-3 transition-all duration-700 ease-in-out ${
						isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
					}`}
				>
					<span>
						<Link to="teams" onClick={() => setIsOpen(false)}>
							Teams
						</Link>
					</span>
					<span>
						<Link to="ranked" onClick={() => setIsOpen(false)}>
							Ranked
						</Link>
					</span>
					<span>
						<Link to="match" onClick={() => setIsOpen(false)}>
							Match
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Nav;

import MobileNav from "@/components/nav/MobileNav";
import FullNav from "@/components/nav/FullNav";

export default async function Nav() {
	const navLinks = [
		{ label: "Teams", href: "/teams" },
		{ label: "Hall of Fame", href: "/hall" },
		{ label: "Match", href: "/timer" },
	];

	return (
		<div>
			<div className="hidden lg:block">
				<FullNav navLinks={navLinks} />
			</div>
			<div className="lg:hidden">
				<MobileNav navLinks={navLinks} />
			</div>
		</div>
	);
}

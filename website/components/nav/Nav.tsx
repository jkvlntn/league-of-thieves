import { validateRef, validateAdmin } from "@/lib/session";
import MobileNav from "@/components/nav/MobileNav";
import FullNav from "@/components/nav/FullNav";

export default async function Nav() {
	const navLinks = [
		{ label: "Teams", href: "/teams" },
		{ label: "Hall of Fame", href: "/hall" },
		{ label: "Match", href: "/timer" },
	];

	const showAdmin = await validateAdmin();
	const showRef = showAdmin || (await validateRef());

	if (showRef) {
		navLinks.push({ label: "Referee", href: "/ref" });
	}
	if (showAdmin) {
		navLinks.push({ label: "Admin", href: "/admin" });
	}

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

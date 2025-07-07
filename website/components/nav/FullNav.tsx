import Image from "next/image";
import Link from "next/link";

interface Props {
	navLinks: { label: string; href: string }[];
}

export default function FullNav({ navLinks }: Props) {
	return (
		<div className="flex h-15 fixed top-0 w-full z-50 text-lg bg-[#111112] px-5">
			<div className="h-full relative w-1/5">
				<Link href={"/"}>
					<Image
						src="/images/title.png"
						alt="League of Thieves"
						fill
						objectFit="contain"
						quality={100}
					/>
				</Link>
			</div>
			<div className="w-3/5 h-full flex justify-center items-center gap-8">
				{navLinks.map((link) => (
					<div
						key={link.href}
						className="transform hover:scale-105 transition-all cursor-pointer"
					>
						<Link href={link.href}>{link.label}</Link>
					</div>
				))}
			</div>
			<div className="h-full w-1/5"></div>
		</div>
	);
}

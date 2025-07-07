import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-[calc(100vh-9rem)] flex flex-col gap-5 sm:gap-0 sm:flex-row sm:items-center w-full">
			{/* left */}
			<div className="flex items-center w-full sm:w-1/2 z-10 hover:z-20 sm:duration-500 sm:hover:scale-110 sm:origin-left sm:transition-all">
				{/* text */}
				<div className="w-full sm:w-2/3 pr-0 sm:pr-5 flex flex-col gap-10 sm:gap-5 md:gap-8 lg:gap-10 items-center">
					<div className="w-full relative aspect-[16/9]">
						<Image
							src="/images/watch_text.png"
							alt="Watch"
							fill
							objectFit="cover"
						/>
					</div>
					<div className="relative w-1/2 aspect-[6/1] tranform hover:scale-105 transition-all">
						<Link href="https://www.twitch.tv/leagueofthievestv">
							<Image
								src="/images/spectate.png"
								alt="Spectate"
								fill
								objectFit="cover"
							/>
						</Link>
					</div>
				</div>
				{/* image */}
				<div className="hidden sm:block w-1/3 relative aspect-[9/20] translate-x-7.5">
					<Image
						src="/images/left_pirate.png"
						alt="Pirate"
						fill
						objectFit="cover"
					/>
				</div>
			</div>

			{/* right */}
			<div className="flex flex-row-reverse items-center w-full sm:w-1/2 z-0 sm:hover:z-20 sm:duration-500 sm:hover:scale-110 sm:origin-right sm:transition-all">
				{/* text */}
				<div className="w-full sm:w-2/3 pr-0 sm:pl-5 flex flex-col gap-10 sm:gap-5 md:gap-8 lg:gap-10 items-center">
					<div className="w-full relative aspect-[16/9]">
						<Image
							src="/images/join_text.png"
							alt="Join"
							fill
							objectFit="cover"
						/>
					</div>
					<div className="relative w-1/2 aspect-[6/1] transform hover:scale-105 transition-all">
						<Link href="https://discord.com/invite/leagueofthieves">
							<Image
								src="/images/enter.png"
								alt="Enter"
								fill
								objectFit="cover"
							/>
						</Link>
					</div>
				</div>

				{/* image */}
				<div className="hidden sm:block w-1/3 relative aspect-[9/20] -translate-x-7.5">
					<Image
						src="/images/right_pirate.png"
						alt="Pirate"
						fill
						objectFit="cover"
					/>
				</div>
			</div>
		</div>
	);
}

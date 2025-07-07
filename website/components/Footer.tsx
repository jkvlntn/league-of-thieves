import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<div className="flex flex-row justify-center gap-8 items-start h-15 w-full z-50">
			<div className="h-10 relative aspect-square">
				<Link href="https://discord.com/invite/leagueofthieves" target="_blank">
					<Image
						src="/images/discord_logo.png"
						alt="Discord"
						fill
						objectFit="contain"
						quality={100}
					/>
				</Link>
			</div>
			<div className="h-10 relative aspect-square">
				<Link href="https://twitter.com/SoTLeague" target="_blank">
					<Image
						src="/images/twitter_logo.png"
						alt="Twitter"
						fill
						objectFit="contain"
						quality={100}
					/>
				</Link>
			</div>
			<div className="h-10 relative aspect-square">
				<Link href="https://www.twitch.tv/leagueofthievestv" target="_blank">
					<Image
						src="/images/twitch_logo.png"
						alt="Twitch"
						fill
						objectFit="contain"
						quality={100}
					/>
				</Link>
			</div>
			<div className="h-10 relative aspect-square">
				<Link
					href="https://www.youtube.com/channel/UC2DsBWEUNLzuTA3odTQ74iA"
					target="_blank"
				>
					<Image
						src="/images/youtube_logo.png"
						alt="YouTube"
						fill
						objectFit="contain"
						quality={100}
					/>
				</Link>
			</div>
		</div>
	);
}

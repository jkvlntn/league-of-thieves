function Footer() {
	return (
		<div className="flex h-15 w-full items-start justify-center gap-8">
			<div className="h-10 aspect-square">
				<a
					href="https://discord.com/invite/leagueofthieves"
					target="_blank"
					rel="noreferrer"
					className="block h-full w-full transition-all hover:scale-105"
				>
					<img src="/discord_logo.png" alt="Discord" />
				</a>
			</div>
			<div className="h-10 aspect-square">
				<a
					href="https://twitter.com/SoTLeague"
					target="_blank"
					className="block h-full w-full transition-all hover:scale-105"
				>
					<img
						src="/twitter_logo.png"
						alt="Twitter"
						className="h-full w-full object-contain"
					/>
				</a>
			</div>
			<div className="h-10 aspect-square">
				<a
					href="https://www.twitch.tv/leagueofthievestv"
					target="_blank"
					className="block h-full w-full transition-all hover:scale-105"
				>
					<img
						src="/twitch_logo.png"
						alt="Twitch"
						className="h-full w-full object-contain"
					/>
				</a>
			</div>
			<div className="h-10 aspect-square">
				<a
					href="https://www.youtube.com/channel/UC2DsBWEUNLzuTA3odTQ74iA"
					target="_blank"
					className="block h-full w-full transition-all hover:scale-105"
				>
					<img
						src="/youtube_logo.png"
						alt="YouTube"
						className="h-full w-full object-contain"
					/>
				</a>
			</div>
		</div>
	);
}

export default Footer;

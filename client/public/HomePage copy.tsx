function HomePage() {
	return (
		<div className="min-h-[inherit] w-full flex flex-col gap-6 sm:flex-row sm:items-center">
			<div className="flex w-full items-center sm:w-1/2 sm:origin-left sm:transition-all sm:duration-500 sm:hover:scale-105">
				<div className="flex w-full flex-col items-center gap-6 sm:w-2/3 sm:pr-5">
					<h1 className="text-white text-4xl font-bold tracking-wide">Watch</h1>
					<a
						href="https://www.twitch.tv/leagueofthievestv"
						target="_blank"
						rel="noreferrer"
						className="rounded bg-white/10 px-6 py-2 text-white transition-all hover:scale-105 hover:bg-white/20"
					>
						Spectate
					</a>
				</div>
				<div className="hidden w-1/3 sm:block">
					<img src="/left_pirate.png" alt="Left pirate" className="w-full object-contain" />
				</div>
			</div>

			<div className="flex w-full flex-row-reverse items-center sm:w-1/2 sm:origin-right sm:transition-all sm:duration-500 sm:hover:scale-105">
				<div className="flex w-full flex-col items-center gap-6 sm:w-2/3 sm:pl-5">
					<h1 className="text-white text-4xl font-bold tracking-wide">Join</h1>
					<a
						href="https://discord.com/invite/leagueofthieves"
						target="_blank"
						rel="noreferrer"
						className="rounded bg-white/10 px-6 py-2 text-white transition-all hover:scale-105 hover:bg-white/20"
					>
						Enter
					</a>
				</div>
				<div className="hidden w-1/3 sm:block">
					<img src="/right_pirate.png" alt="Right pirate" className="w-full object-contain" />
				</div>
			</div>
		</div>
	);
}

export default HomePage;

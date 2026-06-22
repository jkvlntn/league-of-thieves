function HomePage() {
	return (
		<div className="min-h-[inherit] mb-15 sm:mb-0 flex flex-col gap-20 sm:gap-0 sm:flex-row sm:items-center w-full">
			{/* left */}
			<div className="flex items-center w-full sm:w-1/2 z-10 hover:z-20 sm:duration-500 sm:hover:scale-110 sm:origin-left sm:transition-all">
				{/* text */}
				<div className="w-full sm:w-2/3 pr-0 sm:pr-5 flex flex-col gap-10 sm:gap-5 md:gap-8 lg:gap-10 items-center">
					<div className="w-full relative aspect-[16/9]">
						<img
							src="/watch_text.png"
							alt="Watch"
							className="absolute inset-0 h-full w-full object-cover"
						/>
					</div>
					<div className="relative w-1/2 aspect-[6/1] transform hover:scale-105 transition-all">
						<a href="https://www.twitch.tv/leagueofthievestv">
							<img
								src="/spectate.png"
								alt="Spectate"
								className="absolute inset-0 h-full w-full object-cover"
							/>
						</a>
					</div>
				</div>
				{/* image */}
				<div className="hidden sm:block w-1/3 relative aspect-[9/20] translate-x-7.5">
					<img
						src="/left_pirate.png"
						alt="Pirate"
						className="absolute inset-0 h-full w-full object-cover"
					/>
				</div>
			</div>

			{/* right */}
			<div className="flex flex-row-reverse items-center w-full sm:w-1/2 z-0 sm:hover:z-20 sm:duration-500 sm:hover:scale-110 sm:origin-right sm:transition-all">
				{/* text */}
				<div className="w-full sm:w-2/3 pr-0 sm:pl-5 flex flex-col gap-10 sm:gap-5 md:gap-8 lg:gap-10 items-center">
					<div className="w-full relative aspect-[16/9]">
						<img
							src="/join_text.png"
							alt="Join"
							className="absolute inset-0 h-full w-full object-cover"
						/>
					</div>
					<div className="relative w-1/2 aspect-[6/1] transform hover:scale-105 transition-all">
						<a href="https://discord.com/invite/leagueofthieves">
							<img
								src="/enter.png"
								alt="Enter"
								className="absolute inset-0 h-full w-full object-cover"
							/>
						</a>
					</div>
				</div>

				{/* image */}
				<div className="hidden sm:block w-1/3 relative aspect-[9/20] -translate-x-7.5">
					<img
						src="/right_pirate.png"
						alt="Pirate"
						className="absolute inset-0 h-full w-full object-cover"
					/>
				</div>
			</div>
		</div>
	);
}

export default HomePage;

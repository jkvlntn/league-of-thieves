import { redirect } from "next/navigation";
import db from "@/lib/database";
import Image from "next/image";
import { header, motto } from "@/lib/fonts";

interface Props {
	params: Promise<{ name: string }>;
}

const order = [8, 6, 4, 2, 0, 1, 3, 5, 7, 9];

export default async function TeamPage({ params }: Props) {
	const slugName = (await params).name;
	const team = await db.team.findFirst({ where: { slugName: slugName } });
	if (!team) {
		redirect("/teams");
	}
	const players = await db.player.findMany({
		where: { teamId: team.id },
		take: 10,
		orderBy: {
			priority: "desc",
		},
	});
	return (
		<div className="min-h-[calc(100vh-9rem)] flex flex-col justify-center gap-5">
			<div>
				<div
					className={`text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-[#F6AE64] to-[#41301E] ${header.className}`}
				>
					{team.name.toUpperCase()}
				</div>
				<div className={`text-2xl text-center text-white ${motto.className}`}>
					{team.motto}
				</div>
			</div>

			<div className="hidden md:block">
				<div className="flex justify-center h-[300] lg:h-[350] xl:h-[400]">
					{order
						.filter((index) => index < players.length)
						.map((index) => {
							const player = players[index];
							const shiftLeft = index % 2 === 1;
							const shiftRight = index % 2 === 0 && index !== 0;
							return (
								<div
									key={player.id}
									className={`relative aspect-[5/7] h-full ${
										shiftLeft
											? "-ml-35 lg:-ml-41 xl:-ml-45"
											: shiftRight
											? "-mr-35 lg:-mr-41 xl:-mr-45"
											: ""
									}`}
									style={{
										zIndex: players.length - index,
									}}
								>
									<Image
										src={player.image || "/images/default_player.png"}
										alt={player.username}
										fill
										objectFit="contain"
										quality={100}
									/>
								</div>
							);
						})}
				</div>
				<div className="flex flex-wrap justify-center mt-2 gap-4 lg:gap-8 xl:gap-12 xl:text-xl ">
					{order
						.filter((index) => index < players.length)
						.map((index) => {
							const player = players[index];
							return <div key={player.id}>{player.username}</div>;
						})}
				</div>
			</div>
			<div className="flex flex-col md:hidden">
				{players.map((player, index) => {
					return (
						<div
							key={player.id}
							className={`flex gap-3 ${index > 0 ? "-mt-12 sm:-mt-32" : ""} ${
								index % 2 == 0 ? "flex-row" : "flex-row-reverse"
							}`}
						>
							<div className="relative aspect-[5/7] w-[55%] sm:w-[45%]">
								<Image
									src={player.image || "/images/default_player.png"}
									alt={player.username}
									fill
									objectFit="contain"
									quality={100}
								/>
							</div>
							<div
								className={`flex items-center text-lg sm:text-xl ${
									index % 2 == 0 ? "justify-start" : "justify-end"
								} `}
							>
								{player.username}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

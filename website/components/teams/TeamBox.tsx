import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/util";

interface Props {
	name: string;
	image: string;
}

export default function TeamBox({ name, image }: Props) {
	return (
		<div className="flex flex-col gap-2 transform hover:scale-105 transition-all cursor-pointer">
			<Link href={`/teams/${slugify(name)}`}>
				<Image src={image} alt={name} width={200} height={200} quality={100} />
				<div className="text-center">{name}</div>
			</Link>
		</div>
	);
}

export const dynamic = "force-dynamic";
import TeamPageClient from "./TeamPageClient";

interface Props {
	params: Promise<{ name: string }>;
}

export default async function TeamPage({ params }: Props) {
	const slugName = (await params).name;
	const apiURL = process.env.NEXT_PUBLIC_API_URL || "";
	return <TeamPageClient slugName={slugName} apiURL={apiURL} />;
}

export const dynamic = "force-dynamic";
import TeamsPageClient from "./TeamsPageClient";

export default async function TeamsPage() {
	const apiURL = process.env.NEXT_PUBLIC_API_URL || "";
	return <TeamsPageClient apiURL={apiURL} />;
}

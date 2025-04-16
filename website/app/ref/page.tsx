import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import ControlPanel from "./ControlPanel";

export const RefPage = async () => {
	const session = await getSession();
	if (!session.accessLevel || session.accessLevel < 1) {
		redirect("/login");
	}

	return (
		<div className="bg-[#292224] text-white p-5 min-h-screen min-w-full">
			<ControlPanel apiKey={process.env.KEY || ""} />
		</div>
	);
};

export default RefPage;

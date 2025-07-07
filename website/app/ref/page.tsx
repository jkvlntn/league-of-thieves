import { validateRef } from "@/lib/session";
import { redirect } from "next/navigation";
import ControlPanel from "@/components/ref/ControlPanel";

const RefPage = async () => {
	if (!(await validateRef())) {
		redirect("/login");
	}

	return (
		<div className="p-5 min-h-screen min-w-full">
			<ControlPanel
				apiURL={process.env.API_URL || ""}
				apiKey={process.env.KEY || ""}
			/>
		</div>
	);
};

export default RefPage;

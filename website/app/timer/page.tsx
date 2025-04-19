export const dynamic = "force-dynamic";
import Timer from "./Timer";

const TimerPage = async () => {
	return (
		<div className="bg-[#292224] min-h-screen min-w-full flex justify-center items-center">
			<Timer apiURL={process.env.API_URL || ""} />
		</div>
	);
};

export default TimerPage;

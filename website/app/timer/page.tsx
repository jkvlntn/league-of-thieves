export const dynamic = "force-dynamic";
import Timer from "@/components/timer/Timer";

const TimerPage = async () => {
	return (
		<div className="min-h-[calc(100vh-9rem)] flex justify-center items-center">
			<Timer apiURL={process.env.API_URL || ""} />
		</div>
	);
};

export default TimerPage;

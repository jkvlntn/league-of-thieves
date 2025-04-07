import ControlPanel from "./components/ControlPanel";
import TimerPanel from "./components/TimerPanel";
import StatusPanel from "./components/StatusPanel";

export default function BotsPage() {
	return (
		<div className="bg-[#292224] p-5 min-h-screen min-w-full">
			<div className="mt-5">
				<ControlPanel />
			</div>
			<div className="mt-5">
				<TimerPanel />
			</div>
			<div className="mt-5">
				<StatusPanel />
			</div>
		</div>
	);
}

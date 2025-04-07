"use client";
import React, { useState } from "react";
import PanelButton from "./PanelButton";

const TimerPanel: React.FC = () => {
	const [time, setTime] = useState(15 * 60);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	return (
		<div className="bg-neutral-900 p-5">
			<div className="text-white text-6xl text-center">
				{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
					2,
					"0"
				)}`}
			</div>
			<div className="mt-3 flex justify-center gap-3">
				<PanelButton>Start</PanelButton>
				<PanelButton>Pause</PanelButton>
				<PanelButton>Stop</PanelButton>
			</div>
		</div>
	);
};

export default TimerPanel;

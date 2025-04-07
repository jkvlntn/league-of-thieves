"use client";
import React, { useState } from "react";
import PanelButton from "./PanelButton";

const ControlPanel: React.FC = () => {
	const [selectedColors, setSelectedColors] = useState([]);

	return (
		<div className="bg-neutral-900 p-5">
			<div className="flex sm:justify-center justify-between sm:gap-10 gap-3">
				<div className="text-white flex flex-col gap-1">
					<input type="checkbox"></input>
					<label className="">Ref</label>
				</div>
				<div className="text-blue-500 flex flex-col gap-1">
					<input type="checkbox"></input>
					<label className="">Blue</label>
				</div>
				<div className="text-purple-500 flex flex-col gap-1">
					<input type="checkbox"></input>
					<label className="">Purple</label>
				</div>
				<div className="text-green-500 flex flex-col gap-1">
					<input type="checkbox"></input>
					<label className="">Green</label>
				</div>
				<div className="text-red-500 flex flex-col gap-1">
					<input type="checkbox"></input>
					<label className="">Red</label>
				</div>
				<div className="text-yellow-500 flex flex-col gap-1">
					<input type="checkbox"></input>
					<label className="">Gold</label>
				</div>
			</div>
			<div className="mt-3 grid grid-cols-1 grid-rows-8 sm:grid-cols-2 sm:grid-rows-4 gap-3">
				<PanelButton>Join</PanelButton>
				<PanelButton>Leave</PanelButton>
				<PanelButton>Start Game</PanelButton>
				<PanelButton>Game Over</PanelButton>
				<PanelButton>Take Positions</PanelButton>
				<PanelButton>Out of Bounds</PanelButton>
				<PanelButton>Overtime</PanelButton>
				<PanelButton>Timeout</PanelButton>
			</div>
		</div>
	);
};

export default ControlPanel;

"use client";
import React from "react";
import PanelButton from "./PanelButton";

const ControlPanel: React.FC = () => {
	return (
		<div className="bg-neutral-900 p-5">
			<div className="flex justify-center gap-10">
				<div className="text-white">
					<input type="checkbox"></input>
					<label className="ml-2">Ref</label>
				</div>
				<div className="text-blue-500">
					<input type="checkbox"></input>
					<label className="ml-2">Blue</label>
				</div>
				<div className="text-purple-500">
					<input type="checkbox"></input>
					<label className="ml-2">Purple</label>
				</div>
				<div className="text-green-500">
					<input type="checkbox"></input>
					<label className="ml-2">Green</label>
				</div>
				<div className="text-red-500">
					<input type="checkbox"></input>
					<label className="ml-2">Red</label>
				</div>
				<div className="text-yellow-500">
					<input type="checkbox"></input>
					<label className="ml-2">Gold</label>
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

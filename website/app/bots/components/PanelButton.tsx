"use client";
import React from "react";

interface Props {
	children?: React.ReactNode;
	onClick?: () => void;
}

const PanelButton: React.FC<Props> = (props) => {
	return (
		<button
			onClick={props.onClick}
			className="text-white border-2 p-3 cursor-pointer transform hover:scale-105 transition-all"
		>
			{props.children}
		</button>
	);
};

export default PanelButton;

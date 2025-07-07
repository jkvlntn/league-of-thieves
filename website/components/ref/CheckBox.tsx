"use client";
import React from "react";

interface Props {
	children: React.ReactNode;
	checked: boolean;
	className: string;
	onClick: () => void;
}

const CheckBox: React.FC<Props> = (props) => {
	return (
		<div className={props.className}>
			<div
				onClick={() => {
					props.onClick();
				}}
				className="flex flex-col gap-1 cursor-pointer"
			>
				<input
					className="cursor-pointer"
					type="checkbox"
					checked={props.checked}
					onChange={() => {}}
				></input>
				<label className="cursor-pointer">{props.children}</label>
			</div>
		</div>
	);
};

export default CheckBox;

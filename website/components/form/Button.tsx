import React from "react";

interface Props {
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
}
export default function Button({ children, onClick, type }: Props) {
	return (
		<button
			className="border-2 cursor-pointer p-2.5 transform hover:scale-105 transition-all"
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

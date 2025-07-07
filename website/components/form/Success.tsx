import React from "react";

interface Props {
	children?: React.ReactNode;
}

export default function Success(props: Props) {
	if (!props.children) {
		return;
	}

	return (
		<div className=" text-green-800 bg-green-100 text-center border-2 p-2.5">
			{props.children}
		</div>
	);
}

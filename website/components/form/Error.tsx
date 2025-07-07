import React from "react";

interface Props {
	children?: React.ReactNode;
}

export default function Error(props: Props) {
	if (!props.children) {
		return;
	}

	return (
		<div className=" text-red-800 bg-red-100 text-center border-2 p-2.5">
			{props.children}
		</div>
	);
}

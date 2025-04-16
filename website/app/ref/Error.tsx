import React, { useState } from "react";

interface Props {
	children?: React.ReactNode;
}

const Error: React.FC<Props> = (props: Props) => {
	if (props.children === "") {
		return;
	}

	return (
		<div className=" text-red-800 bg-red-100 text-center border-2 p-3">
			{props.children}
		</div>
	);
};

export default Error;

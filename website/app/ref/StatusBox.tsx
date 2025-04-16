import React from "react";

interface Props {
	result: [boolean, string] | null;
}

const StatusBox: React.FC<Props> = ({ result }) => {
	if (result) {
		if (result[0]) {
			return (
				<div
					className="border-1 border-neutral-900 bg-green-300 text-green-300"
					title={result[1]}
				>
					x
				</div>
			);
		}
		return (
			<div
				className="border-1 border-neutral-900
			bg-red-300 text-red-300"
				title={result[1]}
			>
				x
			</div>
		);
	}
	return (
		<div
			className="border-1 border-neutral-900
	bg-gray-300 text-gray-300"
		>
			x
		</div>
	);
};

export default StatusBox;

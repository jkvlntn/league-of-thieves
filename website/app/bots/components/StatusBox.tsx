import React from "react";

interface Props {
	result: [boolean, string] | null;
}

const StatusBox: React.FC<Props> = ({ result }) => {
	if (result) {
		if (result[0]) {
			return (
				<div className="bg-green-300 text-green-300" title={result[1]}>
					x
				</div>
			);
		}
		return (
			<div className="bg-red-300 text-red-300" title={result[1]}>
				x
			</div>
		);
	}
	return <div className="bg-gray-300 text-gray-300">x</div>;
};

export default StatusBox;

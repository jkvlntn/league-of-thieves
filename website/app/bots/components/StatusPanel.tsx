import React from "react";
import StatusBox from "./StatusBox";

type ActionResult = [boolean, string];

interface Results {
	white: ActionResult | null;
	red: ActionResult | null;
	blue: ActionResult | null;
	purple: ActionResult | null;
	green: ActionResult | null;
	yellow: ActionResult | null;
}
interface Props {
	results: Array<Results>;
}

const row: Results = {
	white: [true, "good message"],
	red: [false, "bad message"],
	blue: null,
	purple: null,
	green: null,
	yellow: null,
};

const StatusPanel: React.FC<Props> = (props) => {
	return (
		<div className="bg-neutral-900 p-5 flex justify-center">
			<table className="max-w-full min-w-80">
				<thead>
					<tr>
						<th className="bg-white text-white">x</th>
						<th className="bg-blue-500 text-blue-500">x</th>
						<th className="bg-purple-500 text-purple-500">x</th>
						<th className="bg-green-500 text-green-500">x</th>
						<th className="bg-red-500 text-red-500">x</th>
						<th className="bg-yellow-500 text-yellow-500">x</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<StatusBox result={row.white} />
						</td>
						<td>
							<StatusBox result={row.blue} />
						</td>
						<td>
							<StatusBox result={row.purple} />
						</td>
						<td>
							<StatusBox result={row.green} />
						</td>
						<td>
							<StatusBox result={row.red} />
						</td>
						<td>
							<StatusBox result={row.yellow} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default StatusPanel;

import React from "react";
import { Trash2, Pencil } from "lucide-react";

type TableProps = React.HTMLAttributes<HTMLTableElement>;

export function Table({ className = "", children, ...props }: TableProps) {
	return (
		<table
			className={`w-full border-collapse text-left ${className}`}
			{...props}
		>
			{children}
		</table>
	);
}

export function TableHead({
	className = "",
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<thead className={`bg-gray-700 ${className}`} {...props}>
			{children}
		</thead>
	);
}

export function TableBody({
	className = "",
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tbody className={`divide-y divide-gray-200 ${className}`} {...props}>
			{children}
		</tbody>
	);
}

export function TableRow({
	className = "",
	children,
	...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr className={`hover:bg-gray-800 ${className}`} {...props}>
			{children}
		</tr>
	);
}

export function TableCell({
	className = "",
	children,
	...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
	return (
		<td className={`px-4 py-2 ${className}`} {...props}>
			{children}
		</td>
	);
}

export function TableHeaderCell({
	className = "",
	children,
	...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
	return (
		<th
			className={`px-4 py-2 font-semibold text-sm border-b border-gray-300 ${className}`}
			{...props}
		>
			{children}
		</th>
	);
}

type TableActionsCellProps = {
	onEdit?: () => void;
	onDelete?: () => void;
};

export function TableActionsCell({ onEdit, onDelete }: TableActionsCellProps) {
	return (
		<TableCell>
			<div className="flex gap-2">
				{onEdit && (
					<button
						onClick={onEdit}
						aria-label="Edit"
						className="text-blue-300 cursor-pointer"
					>
						<Pencil size={20} />
					</button>
				)}
				{onDelete && (
					<button
						onClick={onDelete}
						aria-label="Delete"
						className="text-red-400 cursor-pointer"
					>
						<Trash2 size={20} />
					</button>
				)}
			</div>
		</TableCell>
	);
}

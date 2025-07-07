interface Props {
	name?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	placeholder?: string;
	children?: React.ReactNode;
}
export default function Select({
	name,
	value,
	onChange,
	placeholder,
	children,
}: Props) {
	return (
		<select
			className={`border-2 border-white p-2.5 transform hover:scale-105 transition-all bg-[#111112] ${
				value ? "text-white" : "text-gray-400"
			}`}
			name={name}
			value={value}
			onChange={onChange}
		>
			<option value="">{placeholder}</option>
			{children}
		</select>
	);
}

interface Props {
	type: string;
	name: string;
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
	type,
	name,
	placeholder,
	value,
	onChange,
}: Props) {
	return (
		<input
			className="border-2 p-2.5 transform hover:scale-105 transition-all placeholder-gray-400"
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
}

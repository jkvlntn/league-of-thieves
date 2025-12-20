import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
	return (
		<input
			{...props}
			className={`p-2 border border-gray-300 focus:outline-none focus:border-gray-400 rounded ${className}`}
		/>
	);
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", ...props }: SelectProps) {
	return (
		<select
			{...props}
			className={`p-2 bg-[#181a1b] border border-gray-300 focus:outline-none focus:border-gray-400 rounded ${className}`}
		/>
	);
}

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({
	className = "",
	checked,
	color,
	onChange,
	...props
}: CheckboxProps) {
	return (
		<label className="inline-flex cursor-pointer">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				{...props}
				className="sr-only"
			/>
			<span
				className={`flex items-center justify-center h-7 w-7 border-2 rounded ${
					checked ? color : "bg-none"
				} ${className}`}
			>
				{checked && (
					<span className="w-2.5 h-5 border-b-4 border-r-4 border-white rotate-40 -translate-y-0.5" />
				)}
			</span>
		</label>
	);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary";
};

export function Button({
	children,
	variant = "primary",
	className = "",
	...props
}: ButtonProps) {
	const baseClasses = "px-4 py-2 rounded-lg transition-colors cursor-pointer";

	const variantClasses =
		variant === "primary"
			? "bg-gray-700 text-white hover:bg-gray-800"
			: "bg-gray-500 hover:bg-gray-600";

	return (
		<button
			className={`${baseClasses} ${variantClasses} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}

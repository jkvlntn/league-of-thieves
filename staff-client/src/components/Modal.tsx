import type React from "react";
import { X } from "lucide-react";

interface Props {
	title?: string;
	onClose?: () => void;
	children?: React.ReactNode;
}

function Modal({ title, onClose, children }: Props) {
	return (
		<div className="z-100 inset-0 fixed bg-black/50 flex items-center justify-center">
			<div className="bg-[#181a1b] p-6 m-6 w-full max-w-md rounded flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<div className="text-lg">{title}</div>
					<button className="cursor-pointer text-gray-500" onClick={onClose}>
						<X />
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}

export default Modal;

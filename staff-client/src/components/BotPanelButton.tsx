import type { AudioBotSound } from "@lot/common";

interface Props {
	children?: React.ReactNode;
	endpoint: string;
	sound?: AudioBotSound;
	onClick: (endpoint: string, sound?: AudioBotSound) => void;
}

export function BotPanelButton({ children, endpoint, sound, onClick }: Props) {
	return (
		<button
			className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded
			cursor-pointer"
			onClick={() => onClick(endpoint, sound)}
		>
			{children}
		</button>
	);
}

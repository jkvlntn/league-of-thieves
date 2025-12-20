import { AudioBotSound } from "@lot/common";

export const audioFileMapping: Record<AudioBotSound, string> = {
	[AudioBotSound.BEGIN]: "321go.wav",
	[AudioBotSound.GAME_OVER]: "gameover.wav",
	[AudioBotSound.TAKE_POSITION]: "takeposition.mp3",
	[AudioBotSound.OUT_OF_BOUNDS]: "outofbounds.wav",
	[AudioBotSound.OVERTIME]: "overtime.wav",
	[AudioBotSound.TIMEOUT]: "timeout.wav",
	[AudioBotSound.ANCHORS]: "anchors.wav",
	[AudioBotSound.FOUR_SHIPS]: "4ships.wav",
	[AudioBotSound.THREE_SHIPS]: "3ships.wav",
	[AudioBotSound.TWO_SHIPS]: "2ships.wav",
};

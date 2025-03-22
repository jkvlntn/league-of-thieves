import { Channel, Client, GatewayIntentBits, VoiceChannel } from "discord.js";
import {
	AudioPlayer,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
	VoiceConnection,
} from "@discordjs/voice";

export class Bot {
	apiToken: string;
	channelId: string;
	channel: Channel | null;
	voiceConnection: VoiceConnection | null;
	client: Client;
	audioPlayer: AudioPlayer;

	constructor(apiToken: string, channelId: string) {
		this.apiToken = apiToken;
		this.channelId = channelId;
		this.channel = null;
		this.voiceConnection = null;
		this.client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.GuildPresences,
			],
		});
		this.audioPlayer = createAudioPlayer();
	}

	async login(): Promise<boolean> {
		try {
			await this.client.login(this.apiToken);
			return true;
		} catch {
			return false;
		}
	}

	async getChannelFromId(): Promise<boolean> {
		try {
			this.channel = await this.client.channels.fetch(this.channelId);
			return !!this.channel;
		} catch {
			this.channel = null;
			return false;
		}
	}

	joinVoiceChannel(): boolean {
		if (!this.channel) {
			this.leaveVoiceChannel();
			return false;
		}
		try {
			this.voiceConnection = joinVoiceChannel({
				channelId: this.channel.id,
				guildId: (this.channel as VoiceChannel).guild.id,
				group: this.client.user?.id,
				adapterCreator: (this.channel as VoiceChannel).guild
					.voiceAdapterCreator,
			});
			this.voiceConnection.subscribe(this.audioPlayer);
			return true;
		} catch {
			this.leaveVoiceChannel();
			return false;
		}
	}

	leaveVoiceChannel(): boolean {
		this.voiceConnection?.destroy();
		this.voiceConnection = null;
		return true;
	}

	playAudio(audioFile: string): boolean {
		try {
			const audioResource = createAudioResource(audioFile);
			this.audioPlayer.play(audioResource);
			return true;
		} catch {
			return false;
		}
	}
}

// import {
// 	ActionRow,
// 	ChannelType,
// 	ChatInputCommandInteraction,
// 	Client,
// 	Events,
// 	GatewayIntentBits,
// 	GuildScheduledEvent,
// 	Interaction,
// 	MessageFlags,
// 	REST,
// 	Routes,
// } from "discord.js";
import { Client, GatewayIntentBits } from "discord.js";

// export default class RankedBot {
// 	client: Client;
// 	rest: REST;
// 	guildId: string;
// 	constructor() {
// 		this.client = new Client({
// 			intents: [
// 				GatewayIntentBits.Guilds,
// 				GatewayIntentBits.GuildMembers,
// 				GatewayIntentBits.GuildMessages,
// 				GatewayIntentBits.MessageContent,
// 				GatewayIntentBits.GuildVoiceStates,
// 				GatewayIntentBits.GuildPresences,
// 			],
// 		});
// 		this.rest = new REST().setToken(process.env.UTILITY_BOT_TOKEN || "");
// 		this.guildId = process.env.GUILD_ID || "";
// 	}

// 	async login() {
// 		try {
// 			await this.client.login(process.env.UTILITY_BOT_TOKEN || "");
// 			console.log("Utility bot logged in successfully.");
// 		} catch (error) {
// 			console.log("Failed to log in utility bot:", error);
// 		}
// 	}
// }

export default class RankedBot {
	client: Client;
	constructor() {
		this.client = new Client({
			intent: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.GuildPresences,
			],
		});
	}
}

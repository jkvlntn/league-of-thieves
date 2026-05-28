/*import {
	ActionRow,
	ChannelType,
	ChatInputCommandInteraction,
	Client,
	Events,
	GatewayIntentBits,
	GuildScheduledEvent,
	Interaction,
	MessageFlags,
	REST,
	Routes,
} from "discord.js";
import commands from "./commands";
import { orm } from "../lib/database";
import { Team } from "../../generated/prisma";
import { generatePassword } from "../lib/utils";

export default class UtilityBot {
	client: Client;
	rest: REST;
	guildId: string;
	constructor() {
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
		this.rest = new REST().setToken(process.env.UTILITY_BOT_TOKEN || "");
		this.guildId = process.env.GUILD_ID || "";
		this.client.once("ready", () => {
			this.registerCommands();
		});
		this.login();

		this.client.on(Events.InteractionCreate, (interaction) => {
			if (interaction.isChatInputCommand()) {
				this.handleInteraction(interaction);
			}
		});
	}

	async login() {
		try {
			await this.client.login(process.env.UTILITY_BOT_TOKEN || "");
			console.log("Utility bot logged in successfully.");
		} catch (error) {
			console.log("Failed to log in utility bot:", error);
		}
	}

	async registerCommands() {
		try {
			await this.rest.put(
				Routes.applicationCommands(process.env.UTILITY_BOT_ID || ""),
				{
					body: commands.map((command) => command.toJSON()),
				},
			);
			console.log("Successfully reloaded utility bot (/) commands.");
		} catch (error) {
			console.log("Failed to register utility bot commands:", error);
		}
	}

	async handleInteraction(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });
		if (interaction.commandName === "getpassword") {
			await this.doIfCaptainOfTeam(interaction, async (interaction, team) => {
				await interaction.editReply(
					`${team.name} password is \`${team.password}\``,
				);
			});
		} else if (interaction.commandName === "resetpassword") {
			await this.doIfCaptainOfTeam(interaction, async (interaction, team) => {
				const newPassword = generatePassword(16);
				await orm.team.update({
					where: { id: team.id },
					data: { password: newPassword },
				});
				await interaction.editReply(
					`${team.name} password has been reset to \`${newPassword}\``,
				);
			});
		} else if (interaction.commandName === "createchannels") {
			await this.createMatchChannels(
				12,
				"Dauntless",
				"123456789012345678",
				"Rascals",
				"234567890123456789",
				"2023-10-01",
				"Galleon",
			);
			await interaction.editReply("Match channels created successfully.");
		} else {
			await interaction.editReply("Unknown command");
		}
	}

	async doIfCaptainOfTeam(
		interaction: ChatInputCommandInteraction,
		action: (
			interaction: ChatInputCommandInteraction,
			team: Team,
		) => Promise<void>,
	) {
		const roles = this.getRoles(interaction);
		if (!this.isTeamCaptain(roles)) {
			await interaction.editReply(
				"You must be a team captain to use this command.",
			);
			return;
		}
		const blacklistedRoles = await this.getBlacklistedRoles();
		const teamRoles = roles.filter(
			(role) =>
				!(
					blacklistedRoles.includes(role) ||
					role === process.env.CAPTAIN_ROLE_ID
				),
		);
		if (teamRoles.length === 1) {
			const team = await orm.team.findFirst({
				where: { discordRole: teamRoles[0] },
			});
			if (team) {
				await action(interaction, team);
			} else {
				await interaction.editReply("No team found for your role");
			}
		} else if (teamRoles.length < 1) {
			await interaction.editReply("You do not have a team role assigned");
		} else {
			await interaction.editReply("You have multiple team roles assigned");
		}
	}

	async getBlacklistedRoles(): Promise<Array<string>> {
		return (
			await orm.blacklistedRoles.findMany({
				select: { roleId: true },
			})
		).map((role) => role.roleId);
	}

	getRoles(interaction: ChatInputCommandInteraction): Array<string> {
		const member = interaction.member;
		if (member) {
			const roles = member.roles;
			if (!(roles instanceof Array)) {
				const roleList = roles.cache.map((role) => role.id);
				return roleList;
			}
		}
		return [];
	}

	isTeamCaptain(roles: Array<string>): boolean {
		return roles.includes(process.env.CAPTAIN_ROLE_ID || "");
	}

	async createMatchChannels(
		matchId: number,
		team1Name: string,
		team1Role: string,
		team2Name: string,
		team2Role: string,
		date: string,
		shipType: string,
	) {
		const guild = this.client.guilds.cache.get(this.guildId);
		if (!guild) {
			return;
		}
		const category = await guild.channels.create({
			name: `${team1Name} vs ${team2Name} - ${shipType}`,
			type: ChannelType.GuildCategory,
			position: 0,
		});
		const lobbyChannel = await guild.channels.create({
			name: `Lobby`,
			type: ChannelType.GuildVoice,
			parent: category.id,
		});
		const team1Channel = await guild.channels.create({
			name: team1Name,
			type: ChannelType.GuildVoice,
			parent: category.id,
		});
		const team2Channel = await guild.channels.create({
			name: team2Name,
			type: ChannelType.GuildVoice,
			parent: category.id,
		});
	}
}
*/

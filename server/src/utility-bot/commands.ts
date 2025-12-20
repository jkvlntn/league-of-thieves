import { SlashCommandBuilder } from "discord.js";

const commands: Array<SlashCommandBuilder> = [];

const getPasswordCommand = new SlashCommandBuilder()
	.setName("getpassword")
	.setDescription("Get your team password");
commands.push(getPasswordCommand);

const resetPasswordCommand = new SlashCommandBuilder()
	.setName("resetpassword")
	.setDescription("Reset your team password");
commands.push(resetPasswordCommand);

const createChannelsCommand = new SlashCommandBuilder()
	.setName("createchannels")
	.setDescription("Create match channels for a match");
commands.push(createChannelsCommand);

export default commands;

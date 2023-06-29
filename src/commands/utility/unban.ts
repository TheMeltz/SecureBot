import { CacheType, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

async function execute(interaction: { options: CommandInteractionOptionResolver<CacheType>; reply: (arg0: string) => any; }) {
    const options: CommandInteractionOptionResolver = interaction.options;
    const identifier = options.getString('identifier')

    return await interaction.reply(`Unbanning ${identifier}`);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a roblox player using an unique identifier!')
        .addStringOption(option => option.setName('identifier')
            .setDescription('The roblox Username or UserId of the player you wants to unban.')
            .setRequired(true)
            .setMinLength(3)),
    execute: execute
}


import { CacheType, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

async function execute(interaction: { options: CommandInteractionOptionResolver<CacheType>; reply: (arg0: string) => any; }) {

    return await interaction.reply(`In production...`);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bans')
        .setDescription('List all bans!'),
    execute: execute
}


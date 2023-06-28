import { CommandInteraction, SlashCommandBuilder } from "discord.js";

async function execute(interaction: CommandInteraction) {
    const identifier = interaction.options.get('identifier')?.value;
    const reason = interaction.options.get('reason', false)?.value ?? 'No reason provided';
    console.log(`Banned player ${identifier} with reason: ${reason}`);
    await interaction.reply(`Banning ${identifier} for reason: ${reason}`)
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a roblox player using an unique identifier!')
        .addStringOption(option => option.setName('identifier')
            .setDescription('The roblox Username or UserId of the player you wants to ban.')
            .setRequired(true)
            .setMinLength(3))
        .addStringOption(option => option.setName('reason')
            .setDescription('The reason of the ban.')
            .setRequired(false))
        .addStringOption(option => option.setName('duration')
            .setDescription('The duration of the ban, leave blank if you want to be permament.')
            .setRequired(false)
            .addChoices(
                {name: 'day', value: '1d'},
                {name: 'week', value: '1w'},
                {name: 'month', value: '1m'},
                {name: 'season', value: '6m'},
                {name: 'year', value: '1y'}
            )),
    execute: execute
}


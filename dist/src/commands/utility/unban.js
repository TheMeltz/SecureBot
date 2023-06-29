"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function execute(interaction) {
    const options = interaction.options;
    const identifier = options.getString('identifier');
    return await interaction.reply(`Unbanning ${identifier}`);
}
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a roblox player using an unique identifier!')
        .addStringOption(option => option.setName('identifier')
        .setDescription('The roblox Username or UserId of the player you wants to unban.')
        .setRequired(true)
        .setMinLength(3)),
    execute: execute
};

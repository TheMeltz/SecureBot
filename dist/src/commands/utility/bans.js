"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function execute(interaction) {
    return await interaction.reply(`In production...`);
}
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('bans')
        .setDescription('List all bans!'),
    execute: execute
};

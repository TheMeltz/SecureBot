"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Userinfo_1 = __importDefault(require("../../api/Userinfo"));
//@ts-ignore
async function execute(interaction) {
    //@ts-ignore
    const options = interaction.options;
    const identifier = options.getString('identifier');
    const reason = options.getString('reason', false) ?? 'No reason provided';
    const duration = options.getString('duration') ?? 'Permanent';
    const user = await (0, Userinfo_1.default)(identifier);
    if (user?.status == 400) {
        return await interaction.reply(`User with identifier: ${identifier} was not found!`);
    }
    const confirm = new discord_js_1.ButtonBuilder()
        .setCustomId('confirm')
        .setEmoji('🔨')
        .setLabel('Confirm ban')
        .setStyle(discord_js_1.ButtonStyle.Danger);
    const cancel = new discord_js_1.ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setEmoji('❌')
        .setStyle(discord_js_1.ButtonStyle.Secondary);
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(confirm, cancel);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`Are you sure you want to ban ${user.data.Username}(Aka ${user.data.DisplayName})?`)
        .setColor('Red')
        .setDescription(`**User description:**\n${user.data.Description}`)
        .addFields({ name: 'UserId', value: user.data.Id.toString(), inline: true }, { name: 'Ban Duration', value: duration, inline: true }, { name: 'Reason', value: reason, inline: true })
        .setThumbnail(user.data.Image)
        .setTimestamp();
    //@ts-ignore
    return await interaction.reply({
        content: `Please, confirm that you want to ban ${user.data.Username}`,
        embeds: [embed],
        components: [row],
        ephemeral: true
    });
}
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a roblox player using an unique identifier!')
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
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
        .addChoices({ name: '1 day', value: '1d' }, { name: '3 days', value: '3d' }, { name: '1 week', value: '1w' }, { name: '2 weeks', value: '1w' }, { name: '1 month', value: '1m' }, { name: '1 season', value: '6m' }, { name: '1 year', value: '1y' }, { name: '2 years', value: '2y' })),
    execute: execute
};

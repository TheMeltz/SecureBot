import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, CommandInteractionOptionResolver, EmbedBuilder, Interaction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import fetchUserFromIdentifier from "../../api/Userinfo";

//@ts-ignore
async function execute(interaction) {
    //@ts-ignore
    const options: CommandInteractionOptionResolver<CacheType> = interaction.options;
    const identifier = options.getString('identifier')
    const reason = options.getString('reason', false) ?? 'No reason provided';
    const duration = options.getString('duration') ?? 'Permanent';
    const user = await fetchUserFromIdentifier(identifier!);

    if (user?.status == 400) {
       return await interaction.reply(`User with identifier: ${identifier} was not found!`);
    }

    const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setEmoji('🔨')
        .setLabel('Confirm ban')
        .setStyle(ButtonStyle.Danger)

    const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setEmoji('❌')
        .setStyle(ButtonStyle.Secondary)

    const row = new ActionRowBuilder()
        .addComponents(confirm, cancel)

    const embed = new EmbedBuilder()
        .setTitle(`Are you sure you want to ban ${user.data.Username}(Aka ${user.data.DisplayName})?`)
        .setColor('Red')
        .setDescription(`**User description:**\n${user.data.Description}`)
        .addFields(
            { name: 'UserId', value: user.data.Id.toString(), inline: true },
            { name: 'Ban Duration', value: duration, inline: true },
            { name: 'Reason', value: reason, inline: true }
        )
        .setThumbnail(user.data.Image)
        .setTimestamp()

    //@ts-ignore
    return await interaction.reply({
        content: `Please, confirm that you want to ban ${user.data.Username}`,
        embeds: [embed],
        components: [row],
        ephemeral: true
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a roblox player using an unique identifier!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
                {name: '1 day', value: '1d'},
                {name: '3 days', value: '3d'},
                {name: '1 week', value: '1w'},
                {name: '2 weeks', value: '1w'},
                {name: '1 month', value: '1m'},
                {name: '1 season', value: '6m'},
                {name: '1 year', value: '1y'},
                {name: '2 years', value: '2y'}
            )),
    execute: execute
}


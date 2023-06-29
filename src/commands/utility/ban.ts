import { CacheType, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";
import fetchUserFromIdentifier from "../../api/Userinfo";

async function execute(interaction: { options: CommandInteractionOptionResolver<CacheType>; reply: (arg0: string) => any; }) {
    const options: CommandInteractionOptionResolver = interaction.options;
    const identifier = options.getString('identifier')
    const reason = interaction.options.getString('reason', false) ?? 'No reason provided';
    const user = await fetchUserFromIdentifier(identifier!);

    console.log(user);
    if (user?.status == 400) {
       return await interaction.reply(`User with identifier: ${identifier} was not found!`);
    }

    return await interaction.reply(`Banning ${user.data.Username} for reason: ${reason}`);
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


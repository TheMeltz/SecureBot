"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const { DISCORD_CLIENT_TOKEN } = process.env;
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
//@ts-ignore
client.commands = new discord_js_1.Collection();
const commandsPath = path_1.default.join(__dirname, 'commands/utility');
const commandFiles = fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
for (const file of commandFiles) {
    const filePath = path_1.default.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        //@ts-ignore
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
client.once(discord_js_1.Events.ClientReady, bot => {
    console.log(`> Ready! Logged in as ${bot.user.tag}`);
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    //@ts-ignore
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});
client.login(DISCORD_CLIENT_TOKEN);

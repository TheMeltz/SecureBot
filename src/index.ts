import "dotenv/config";
import {Client, Events, GatewayIntentBits} from "discord.js";
const { DISCORD_CLIENT_TOKEN } = process.env;
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, bot => {
	console.log(`> Ready! Logged in as ${bot.user.tag}`);
});

client.login(DISCORD_CLIENT_TOKEN);
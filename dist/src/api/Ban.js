"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const { ROBLOX_API_KEY, UNIVERSE_ID } = process.env;
const KICK_TOPIC = 'KickPlayer';
const CROSS_SERVER_MESSAGING = 'https://apis.roblox.com/messaging-service';
const KICK_SERVER_MESSAGING_ENDPOINT = `${CROSS_SERVER_MESSAGING}/v1/universes/${UNIVERSE_ID}/topics/${KICK_TOPIC}`;
async function kickPlayer(playerUserId, reason) {
    const headers = new Headers();
    headers.append('x-api-key', ROBLOX_API_KEY);
    headers.append('Content-Type', 'application/json');
    console.log(ROBLOX_API_KEY);
    const response = await fetch(KICK_SERVER_MESSAGING_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            message: JSON.stringify({
                Id: playerUserId.toString(),
                Reason: reason
            })
        })
    });
    return response.status;
}
async function banPlayer(playerUserId, reason) {
    await kickPlayer(playerUserId, reason);
}
kickPlayer(3516717396, 'Testando').then((response) => {
    console.log(response);
});

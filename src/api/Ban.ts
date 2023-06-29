import "dotenv/config";
const { ROBLOX_API_KEY, UNIVERSE_ID } = process.env;
const KICK_TOPIC: string = 'KickPlayer';
const CROSS_SERVER_MESSAGING: string = 'https://apis.roblox.com/messaging-service';
const KICK_SERVER_MESSAGING_ENDPOINT: string = `${CROSS_SERVER_MESSAGING}/v1/universes/${UNIVERSE_ID}/topics/${KICK_TOPIC}`;
const DATASTORE_BASE_ENDPOINT: string = `https://apis.roblox.com/datastores/v1/universes/{universeId}`

const headers: Headers = new Headers();
headers.append('x-api-key', ROBLOX_API_KEY!);
headers.append('Content-Type', 'application/json');

async function kickPlayer(playerUserId: number, reason: string) {
    const response = await fetch(KICK_SERVER_MESSAGING_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            message: JSON.stringify({
                Id: playerUserId.toString(),
                Reason: reason
            })
        })
    })

    return response.status;
}

async function banPlayer(playerUserId: number, reason: string,) {
    await kickPlayer(playerUserId, reason);
}

module.exports = {
    kickPlayer,
    banPlayer
}
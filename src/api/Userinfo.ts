import "node-fetch";
const USERS_ENDPOINT: string = 'https://users.roblox.com/v1/users';

async function fetchUserFromIdentifier(identifier: string) {
    if (!identifier) return {status: 400}
    if (identifier.length < 3) return {status: 400}

    if (isNaN(Number(identifier))) {
        try {
            const response = await fetch(USERS_ENDPOINT, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    usernames: [identifier]
                })
            });
            const data = await response.json();
            console.log(data);
            return data
        } catch {
            console.error(`Error while trying to fetch information about identifier ${identifier}`)
            return {status: 400}
        }
    }
}

export default fetchUserFromIdentifier
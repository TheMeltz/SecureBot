"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const THUMBNAIL_ENDPOINT = 'https://thumbnails.roblox.com/v1/users/avatar-headshot?';
const USERINFO_ENDPOINT = 'https://users.roblox.com/v1/users/';
const GET_USER_BY_NAME_ENDPOINT = 'https://users.roblox.com/v1/usernames/users';
async function getUserinfoFromId(id) {
    const USERINFO_URL_REQUEST = `${USERINFO_ENDPOINT}${id.toString()}`;
    const userInfoResponse = await (await fetch(USERINFO_URL_REQUEST)).json();
    const { name, description, displayName } = userInfoResponse;
    const THUMB_URL_REQUEST = `${THUMBNAIL_ENDPOINT}userIds=${id.toString()}&size=720x720&format=Png&isCircular=true`;
    const thumbResponse = await (await fetch(THUMB_URL_REQUEST)).json();
    const thumbnail = thumbResponse.data[0]?.imageUrl;
    return {
        Username: name,
        DisplayName: displayName,
        Id: id,
        Description: description,
        Image: thumbnail
    };
}
async function fetchUserFromIdentifier(identifier) {
    const isUserId = !isNaN(Number(identifier));
    if (isUserId) {
        try {
            const data = await getUserinfoFromId(Number(identifier));
            return {
                status: 200,
                data: data
            };
        }
        catch {
            return {
                status: 400,
                data: {
                    Username: 'Not found',
                    Description: 'Not found',
                    DisplayName: 'Not found',
                    Id: 0,
                    Image: 'Not found'
                }
            };
        }
    }
    const response = await (await fetch(GET_USER_BY_NAME_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
            usernames: [identifier],
            excludeBannedUsers: true
        })
    })).json();
    console.log(response);
    const { id } = response.data[0];
    const data = await getUserinfoFromId(id);
    return {
        status: 200,
        data: data
    };
}
exports.default = fetchUserFromIdentifier;

const THUMBNAIL_ENDPOINT: string = 'https://thumbnails.roblox.com/v1/users/avatar-headshot?';
const USERINFO_ENDPOINT: string = 'https://users.roblox.com/v1/users/';
const GET_USER_BY_NAME_ENDPOINT: string = 'https://users.roblox.com/v1/usernames/users'


interface Data {
    Username: string
    DisplayName: string
    Id: number
    Description: string
    Image: string
}

interface UserResponse {
    status: number,
    data: Data
}

async function getUserinfoFromId(id: number): Promise<Data> {
    const USERINFO_URL_REQUEST: string = `${USERINFO_ENDPOINT}${id.toString()}`;
    const userInfoResponse = await (await fetch(USERINFO_URL_REQUEST)).json();
    const {name, description, displayName} = userInfoResponse;
    
    const THUMB_URL_REQUEST: string = `${THUMBNAIL_ENDPOINT}userIds=${id.toString()}&size=720x720&format=Png&isCircular=true`;
    const thumbResponse = await (await fetch(THUMB_URL_REQUEST)).json();
    const thumbnail: string = thumbResponse.data[0]?.imageUrl;

    return {
        Username: name,
        DisplayName: displayName,
        Id: id,
        Description: description,
        Image: thumbnail
    }
}

async function fetchUserFromIdentifier(identifier: string): Promise<UserResponse> {
    const isUserId: boolean = !isNaN(Number(identifier));

    if (isUserId) {
        try {
            const data: Data = await getUserinfoFromId(Number(identifier))
            return {
                status: 200,
                data: data
            }
        } catch {
            return {
                status: 400,
                data: {
                    Username: 'Not found',
                    Description: 'Not found',
                    DisplayName: 'Not found',
                    Id: 0,
                    Image: 'Not found'
                }
            }
        }
    }

    const response = await (await fetch(GET_USER_BY_NAME_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
            usernames: [identifier],
            excludeBannedUsers: true
        })
    })).json();
    const {id} = response.data[0];
    const data = await getUserinfoFromId(id);

    return {
        status: 200,
        data: data
    }
}

export default fetchUserFromIdentifier;
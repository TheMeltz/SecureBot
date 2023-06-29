import fetchUserFromIdentifier from "../src/api/Userinfo";

describe('fetchUserFromIdentifier', () => {
  it('should return status 400 if no identifier is provided', async () => {
    const result = await fetchUserFromIdentifier('');
    expect(result?.status).toBe(400);
  });

  it('should fetch user information by username', async () => {
    const result = await fetchUserFromIdentifier('Roblox');
    expect(result?.status).toBe(200);
    expect(result?.data).toBeDefined();
    expect(result?.data.Username).toBe('Roblox');
  });

  it('should fetch user information by userID', async () => {
    const result = await fetchUserFromIdentifier('1');
    expect(result?.status).toBe(200);
    expect(result?.data).toBeDefined();
    expect(result?.data.Id).toBe(1);
  });

  it('should return status 404 if user information is not found', async () => {
    const result = await fetchUserFromIdentifier('nonexistentUser15473573265');
    expect(result?.status).toBe(404);
  });
});

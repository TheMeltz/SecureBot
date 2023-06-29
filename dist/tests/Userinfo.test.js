"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Userinfo_1 = __importDefault(require("../src/api/Userinfo"));
require("jest");
describe('fetchUserFromIdentifier', () => {
    it('should return status 400 if no identifier is provided', async () => {
        const result = await (0, Userinfo_1.default)('');
        expect(result?.status).toBe(400);
    });
    it('should fetch user information by username', async () => {
        const result = await (0, Userinfo_1.default)('Roblox');
        expect(result?.status).toBe(200);
        expect(result?.data).toBeDefined();
        expect(result?.data.Username).toBe('Roblox');
    });
    it('should fetch user information by userID', async () => {
        const result = await (0, Userinfo_1.default)('1');
        expect(result?.status).toBe(200);
        expect(result?.data).toBeDefined();
        expect(result?.data.Id).toBe(1);
    });
    it('should return status 404 if user information is not found', async () => {
        const result = await (0, Userinfo_1.default)('nonexistentUser15473573265');
        expect(result?.status).toBe(404);
    });
});

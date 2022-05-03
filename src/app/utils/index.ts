import { AuthorizationError } from "iyasunday";
import Account from "../modules/account/model";
import { getRedis, setRedis, setRedisEx } from "./redis";

export const Authentication = {
    getUser: async (token: string) => {
        if (!token) throw new AuthorizationError("Please provide authentication details");
        token = token.split(" ").pop();

        const credentials = Buffer.from(token, 'base64').toString('ascii');

        const [username = undefined, password = undefined] = credentials.split(':');

        if (!username || !password) throw new AuthorizationError('Invalid authorization sent')

        let user = await getRedis(username, true);
        if (!user) {
            user = await Account.findOne({ where: { username } });
            if (!user) throw new AuthorizationError(`Invalid authorization credentials sent`)
            await setRedis(username, user);
        }

        if (user.auth_id != password) throw new AuthorizationError(`Invalid authorization credentials sent`);
        return user;
    }
}
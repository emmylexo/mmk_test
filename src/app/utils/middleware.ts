import { Authentication } from '.';
import Redis, { delRedis, getRedis, setRedis, setRedisEx } from './redis';

export async function guard(req, res, next) {
    try {
        req.user = await Authentication.getUser(req.headers.authorization);
        return next();
    } catch (err) {
        return next(err);
    }
}

export async function rateLimiter(req, res, next) {
    try {
        const { from } = req.body;
        const redisData = await getRedis(from, true);
        if (redisData === null) {
            const newData = { from, limit: 1 };
            await setRedisEx(from, newData, parseInt(process.env.REDIS_RATE_LIMITER_TIMEOUT_SECONDS));
            return next();
        }

        if (parseInt(redisData.limit) >= parseInt(process.env.REDIS_RATE_LIMITER_MAX_REQUEST)) throw new Error(`Limit reached for from ${from}`);

        redisData.limit = parseInt(redisData.limit) + 1;
        const keyName = `${from}_${process.env.NODE_ENV}`
        await Redis.set(keyName, JSON.stringify(redisData), { KEEPTTL: true });
        return next();
    } catch (error) {
        return next(error)
    }
}
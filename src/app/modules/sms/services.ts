import { ExistsError, NotFoundError } from "iyasunday";
import db from "../../utils/db"
import { getRedis, setRedisEx } from "../../utils/redis";
import { AccountInterface } from "../account/interface";
import PhoneNumber from "../phoneNumber/model";
import { SMSInterface } from "./interface";

export const updateRedis = async (key: string, newValue: SMSInterface) => {
    try {
        const redisValue = await getRedis(key, true);
        if (redisValue) {
            throw new ExistsError(`Please wait for expiration of previous stop message sent`)
        }

        await setRedisEx(key, newValue, parseInt(process.env.REDIS_TIMEOUT_SECONDS));
        return true;

    } catch (error) {
        throw error;
    }
}


export const inboundSMS = async (user: AccountInterface, body: SMSInterface) => {
    try {
        const { text } = body;
        const phoneNumber = await PhoneNumber.findOne({
            where: { number: body.to, account_id: user.id }
        });

        if (!phoneNumber) throw new NotFoundError(`to parameter not found`)

        if (text === `STOP` || text === `STOP\n` || text === `STOP\r` || text === `STOP\r\n`) {
            const key = body.to + `_` + body.from;
            await updateRedis(key, body);
        }

        return {
            success: true,
            message: "inbound sms ok"
        }
    } catch (error) {
        throw error;
    }
}

export const outboundSMS = async (user: AccountInterface, body: SMSInterface) => {
    try {
        const key = body.to + `_` + body.from;
        const redisData = await getRedis(key, true);
        if (redisData) throw new ExistsError(`sms from ${body.from} to ${body.to} blocked by STOP request`);

        const phoneNumber = await PhoneNumber.findOne({
            where: { number: body.from, account_id: user.id }
        });

        if (!phoneNumber) throw new NotFoundError(`from parameter not found`)

        return {
            success: true,
            message: "outbound sms ok"
        }
    } catch (error) {
        throw error;
    }
}
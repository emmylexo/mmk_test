import { Router } from "express";
import { joiValidator } from "iyasunday";
import validation from "./validation";
import * as controller from './controller';
import { guard, rateLimiter } from "../../utils/middleware";

const route = Router();

route.post(
    "/inbound/sms",
    joiValidator(validation.inbound),
    guard,
    controller.inboundSMS
);

route.post(
    "/outbound/sms",
    joiValidator(validation.outbound),
    guard,
    rateLimiter,
    controller.outboundSMS
);
export default route;
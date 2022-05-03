import { Request, Response, NextFunction } from 'express';
import * as services from './services';

export const inboundSMS = async (
    req,
    res,
    next
) => {
    try {
        res.status(200).json(await services.inboundSMS(req.user, req.body));
    } catch (error) {
        next(error);
    }
}

export const outboundSMS = async (
    req,
    res,
    next
) => {
    try {
        res.status(200).json(await services.outboundSMS(req.user, req.body));
    } catch (error) {
        next(error);
    }
}
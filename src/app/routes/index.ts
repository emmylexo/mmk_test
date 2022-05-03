import { Application } from "express";
import { errorMessage } from "iyasunday";
import SMSEndpoints from '../modules/sms';

export default (app: Application): void => {
    const apiVersion: string = '/v1';

    app.use(apiVersion, SMSEndpoints);

    app.use((err, req, res, next) => {
        if (err) {
            res.status(err.httpStatusCode || 400).json(errorMessage(err));
            return res.end();
        }
        return next();
    });

    app.use((req, res, next) => {
        if (req.method != 'POST')
            res.status(405).json({
                message: "Request method not allowed",
                service: process.env.APP_NAME,
            });

        res.status(404).json({
            message: "Requested route not found",
            service: process.env.APP_NAME,
        });
    });
};

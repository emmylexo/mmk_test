import Express from 'express';
import db from './app/utils/db';
import Middleware from './app/routes/middleware';
import Routes from './app/routes';
import cors from 'cors';

const app = Express();

app.use(
    cors({
        origin: "*",
        methods: "POST",
    })
);

Middleware(app);
Routes(app);

(async () => {
    try {
        db.sync();
        app.listen(process.env.PORT, () => {
            console.log(`App connected on port ${process.env.PORT}`)
            app.emit("appStarted");
        })
    } catch (error) {
        throw error;
    }

})();

export default app;
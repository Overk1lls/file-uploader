import express from 'express';
import { router as index } from './routes/main';

export const createApp = () => {
    const app = express();

    app.use(express.static('./public'));
    app.use('/', index);

    return app;
};
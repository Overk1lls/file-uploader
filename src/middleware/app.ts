import express from 'express';
import { RequestErrorHandler } from './handlers/error.handler';
import { router as index } from './routes/main';

export const createApp = () => {
    const app = express();

    app.use(express.static('./public'));
    app.use('/', index);
    app.use(RequestErrorHandler);

    return app;
};
import express from 'express';
import { multerFileUpload } from '../lib/multer';
import { router as index } from './routes/main';
import { RequestErrorHandler } from './handlers/error.handler';

export const createApp = () => {
    const app = express();

    app.use(express.static('./public'));
    app.use(multerFileUpload.single('file'));
    app.use('/', index);
    app.use(RequestErrorHandler);

    return app;
};
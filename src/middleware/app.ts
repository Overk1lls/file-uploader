import express from 'express';
import multer from "multer";
import { multerFileFilter } from '../lib/file';
import { router as index } from './routes/main';
import { RequestErrorHandler } from './handlers/error.handler';

export const upload = multer({
    dest: './uploads',
    fileFilter: multerFileFilter,
});

export const createApp = () => {
    const app = express();

    app.use(express.static('./public'));
    app.use(upload.single('file'));
    app.use('/', index);
    app.use(RequestErrorHandler);

    return app;
};
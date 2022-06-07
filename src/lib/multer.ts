import multer from "multer";
import { IncomingMessage } from "http";
import { FileFilterCallback } from 'multer';
import { LogicError } from "../errors/logic.error";
import { ErrorCode } from "../errors/codes";

/**
 * Only image, video, audio and applications files allowed.
 */
const mimetypeRegex = /^(image|video|audio|application)\//;
/**
 * In bytes.
 */
const fileSizeLimit = 52428800;
const storage = multer.memoryStorage();

const fileFilter = (
    req: IncomingMessage,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const { mimetype } = file;

    if (mimetype.search(mimetypeRegex) === -1) {
        cb(new LogicError(
            ErrorCode.FileNotAppropriate,
            `.${mimetype.split('/')[1]} type is not supported`
        ));
    }
    cb(null, true);
};

export const multerFileUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: fileSizeLimit,
    }
});
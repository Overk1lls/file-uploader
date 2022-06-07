import sharp from "sharp";
import { ImageDTO } from "../interfaces/image.dto";
import { IncomingMessage } from "http";
import { FileFilterCallback } from 'multer';
import { LogicError } from "../errors/logic.error";
import { ErrorCode } from "../errors/codes";

const mimetypeRegex = /^(image|video|audio|application)\//;

export const resizeImage = async (image: ImageDTO) => {
    const { file, width, height } = image;
    let toWidth: number;
    let toHeight: number;

    if (width > 2048) {
        toWidth = 2048;
    }
    if (height > 2048) {
        toHeight = 2048;
    }
    if (width < 300) {
        toWidth = 300;
    }
    if (height < 300) {
        toHeight = 300;
    }
    return sharp(file).resize(width, height).toBuffer();
};

export const multerFileFilter = (
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
import { readFileSync } from "fs";
import { resolve } from "path";

export const file = readFileSync(resolve('./') + '/public/img/test-img.png');
export const fileName = 's3ServiceTest.png';
export const multerFile: Express.Multer.File = {
    fieldname: 'file',
    originalname: fileName,
    encoding: '7bit',
    mimetype: 'image/png',
    size: 900669,
    buffer: file,
    stream: undefined,
    destination: undefined,
    filename: undefined,
    path: undefined
};
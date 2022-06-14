import { FileFilterCallback } from "multer";
import { Nullable } from '../../src/lib/types';
import { fileFilter } from '../../src/lib/multer';
import { multerFile } from "../config";
import { LogicError } from "../../src/errors/logic.error";

const multerFileCb: FileFilterCallback = (error: Nullable<Error>, acceptFile?: boolean) => {
    if (error) {
        throw error;
    }
    if (acceptFile === undefined) {
        throw new TypeError('acceptFile is undefined');
    }
};

describe('Multer Lib Test', () => {
    test('Test with error callback', () => {
        const file: Express.Multer.File = { ...multerFile, mimetype: 'wrong/type' };
        expect(() => fileFilter(null, file, multerFileCb))
            .toThrowError(LogicError);
    });

    test('Test with non-error callback', () => {
        
        expect(() => fileFilter(null, multerFile, multerFileCb)).not
            .toThrowError();
    });
});
import { Router } from "express";
import { LogicError } from "../../errors/logic.error";
import { ErrorCode } from "../../errors/codes";
import { s3Service } from "../..";

export const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            throw new LogicError(ErrorCode.FileIsNotFound);
        }
        const uploadResult = await s3Service.uploadFile(file);

        res.status(200).json(
            typeof uploadResult === 'string' ?
                { location: uploadResult } :
                uploadResult
        );
    } catch (error) {
        next(error);
    }
});
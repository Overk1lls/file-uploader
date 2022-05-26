import multer from "multer";
import S3 from 'aws-sdk/clients/s3';
import { Router } from "express";
import { createReadStream, unlinkSync } from "fs";
import { localConfig, s3 } from "../..";
import { LogicError } from "../../errors/logic.error";
import { ErrorCode } from "../../errors/codes";
import { ServerError } from "../../errors/server.error";

export const router = Router();
export const upload = multer({ dest: './uploads' });

router.post('/', upload.single('file'), (req, res, next) => {
    try {
        if (!req.file) {
            throw new LogicError(ErrorCode.FileIsNotFound);
        }
        const fileName = `file/${req.file?.originalname}`;
        const { bucketName } = localConfig;

        const reqData: S3.PutObjectRequest = {
            ACL: 'public-read',
            Bucket: bucketName,
            Key: fileName,
            Body: createReadStream(req.file!.path)
        };
        s3.upload(reqData, (error, data) => {
            if (error) {
                throw new ServerError(ErrorCode.FileIsNotUploaded, error.message);
            }
            unlinkSync(req.file!.path);

            res.json({ url: data.Location });
        });
    } catch (error) {
        next(error);
    }
});
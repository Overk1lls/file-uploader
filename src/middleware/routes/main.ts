import multer from "multer";
import S3 from 'aws-sdk/clients/s3';
import { Router } from "express";
import { createReadStream, unlinkSync } from "fs";
import { localConfig, s3 } from "../..";

export const router = Router();
export const upload = multer({ dest: './uploads' });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(404).send('File is not found');
    }
    const fileName = `file/${req.file?.originalname}`;
    const { bucketName } = localConfig;
    
    const obj: S3.PutObjectRequest = {
        ACL: 'public-read',
        Bucket: bucketName,
        Key: fileName,
        Body: createReadStream(req.file!.path)
    };
    s3.upload(obj, (error, data) => {
        if (error) {
            throw new Error(error.message);
        }
        unlinkSync(req.file!.path);
        
        res.json({ url: data.Location });
    });
});
import express from 'express';
import multer from 'multer';
import S3 from 'aws-sdk/clients/s3';
import { config as dotenvInit } from 'dotenv';
import { createReadStream, unlinkSync } from 'fs';

dotenvInit();

const app = express();
const upload = multer({ dest: './uploads' });

const extractConfig = () => {
    const {
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        AWS_BUCKET_NAME
    } = process.env;

    if (!AWS_ACCESS_KEY_ID) {
        throw new Error('AWS Access Key ID is not found');
    }
    if (!AWS_SECRET_ACCESS_KEY) {
        throw new Error('AWS Secret Access Key is not found');
    }
    if (!AWS_BUCKET_NAME) {
        throw new Error('AWS Bucket Name is not found');
    }
    return {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        bucketName: AWS_BUCKET_NAME,
    };
};

const config = extractConfig();

const { accessKeyId, secretAccessKey } = config;
const s3 = new S3({ accessKeyId, secretAccessKey });

app.use(express.static('./public'));

app.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(404).send('File is not found');
    }
    const fileName = `file/${req.file?.originalname}`;

    const obj: S3.PutObjectRequest = {
        ACL: 'public-read',
        Bucket: config.bucketName,
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



app.listen(3000, () => console.log('App is running on port 3000'));
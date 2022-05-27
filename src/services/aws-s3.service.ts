import S3 from 'aws-sdk/clients/s3';
import imageSize from 'image-size';
import { createReadStream, readFileSync } from 'fs';
import { ErrorCode } from '../errors/codes';
import { Config } from '../lib/config';
import { LogicError } from '../errors/logic.error';
import { toResizeObject } from '../lib/utils';

const bucketDirName = 'file/';

export class AWSS3Service {
    private readonly s3: S3;
    private readonly bucketName: string;

    constructor(config: Config) {
        const { accessKeyId, secretAccessKey, bucketName } = config;
        this.s3 = new S3({ accessKeyId, secretAccessKey });
        this.bucketName = bucketName;
    }

    async uploadFile(file: Express.Multer.File) {
        const { path, mimetype, originalname } = file;
        const savedFile = readFileSync(path);
        let fileName = bucketDirName + originalname;

        const fileData: S3.PutObjectRequest = {
            ACL: 'public-read',
            Bucket: this.bucketName,
            Key: fileName,
            Body: createReadStream(path),
            ContentType: mimetype
        };
        if (!mimetype.includes('image/')) {
            const { Location } = await this.upload(fileData, path);
            return Location;
        }

        const dimensions = imageSize(savedFile);
        const { height, width } = dimensions;

        if (!height || !width) {
            throw new LogicError(ErrorCode.FileSizeNotFound);
        }
        if (height > 2048 || width > 2048) {
            throw new LogicError(ErrorCode.FileSizeIsBig);
        }
        const { large, medium, thumb } = await toResizeObject(savedFile);

        const fileDatas: S3.PutObjectRequest[] = [];
        fileDatas.push(
            { ...fileData, Key: '2048x2048_' + originalname, Body: large },
            { ...fileData, Key: '1024x1024_' + originalname, Body: medium },
            { ...fileData, Key: '300x300' + originalname, Body: thumb },
        );

        const locations: string[] = [];
        for (let i = 0; i < fileDatas.length; i++) {
            const upload = await (this.upload(fileDatas[i], path));
            locations.push(upload.Location);
        }
        const [
            largeFileLocation,
            mediumFileLocation,
            thumbFileLocation
        ] = locations;
        return {
            large: largeFileLocation,
            medium: mediumFileLocation,
            small: thumbFileLocation,
        };
    }

    private upload(object: S3.PutObjectRequest, path: string) {
        return this.s3.upload(object).promise();
    }

    public get client(): S3 {
        return this.s3;
    }
}
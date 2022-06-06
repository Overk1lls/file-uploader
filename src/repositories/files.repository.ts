import S3 from 'aws-sdk/clients/s3';
import { createReadStream } from 'fs';
import { Config } from '../lib/config';

const bucketDirName = 'file/';

export class FilesRepository {
    private readonly s3: S3;
    private readonly bucketName: string;

    constructor(config: Pick<Config, 'accessKeyId' | 'secretAccessKey' | 'bucketName'>) {
        const { accessKeyId, secretAccessKey, bucketName } = config;
        this.s3 = new S3({ accessKeyId, secretAccessKey });
        this.bucketName = bucketName;
    }

    upload({ name, mimetype, pathToFile, file }: {
        name: string,
        mimetype: string,
        pathToFile?: string,
        file?: Buffer
    }) {
        const fileDataObject: S3.PutObjectRequest = {
            ACL: 'public-read',
            Bucket: this.bucketName,
            Key: bucketDirName + name,
            Body: pathToFile ? createReadStream(pathToFile) : file,
            ContentType: mimetype,
        };
        return this.s3.upload(fileDataObject).promise();
    }
}
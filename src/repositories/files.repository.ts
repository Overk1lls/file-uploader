import S3 from 'aws-sdk/clients/s3';
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

  uploadFile(file: Pick<Express.Multer.File, 'buffer' | 'originalname' | 'mimetype'>) {
    const { buffer, originalname, mimetype } = file;
    const fileDataObject: S3.PutObjectRequest = {
      ACL: 'public-read',
      Bucket: this.bucketName,
      Key: bucketDirName + originalname,
      Body: buffer,
      ContentType: mimetype,
    };
    return this.s3.upload(fileDataObject).promise();
  }
}

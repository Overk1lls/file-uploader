import { config as dotenvInit } from 'dotenv';

dotenvInit();

export interface Config {
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
}

export const awsEnvPrefix = 'AWS_';

export const extractConfig = (): Config => {
    let key = awsEnvPrefix + 'ACCESS_KEY_ID';

    const accessKeyId = process.env[key];
    if (!accessKeyId) {
        throw new Error(`Env ${key} is missing!`);
    }

    key = awsEnvPrefix + 'SECRET_ACCESS_KEY';
    const secretAccessKey = process.env[key];
    if (!secretAccessKey) {
        throw new Error('AWS Secret Access Key is not found');
    }

    key = awsEnvPrefix + 'BUCKET_NAME';
    const bucketName = process.env[key];
    if (!bucketName) {
        throw new Error('AWS Bucket Name is not found');
    }
    return {
        accessKeyId,
        secretAccessKey,
        bucketName,
    };
};
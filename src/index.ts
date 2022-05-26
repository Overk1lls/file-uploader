import S3 from 'aws-sdk/clients/s3';
import { config as dotenvInit } from 'dotenv';
import { extractConfig } from './lib/config';
import { createApp } from './middleware/app';

dotenvInit();

export const localConfig = extractConfig();

const { accessKeyId, secretAccessKey } = localConfig;
export const s3 = new S3({ accessKeyId, secretAccessKey });

const app = createApp();

app.listen(3000, () => console.log('App is running on port 3000'));

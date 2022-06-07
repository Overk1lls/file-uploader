import { config as dotenvInit } from 'dotenv';

dotenvInit();

export interface Config {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  port: string;
}

export const awsEnvPrefix = 'AWS_';

export const extractConfig = (): Config => {
  let key = awsEnvPrefix + 'ACCESS_KEY_ID';
  const envErrorResponse = `Env ${key} is missing!`;

  const accessKeyId = process.env[key];
  if (!accessKeyId) {
    throw new Error(envErrorResponse);
  }

  key = awsEnvPrefix + 'SECRET_ACCESS_KEY';
  const secretAccessKey = process.env[key];
  if (!secretAccessKey) {
    throw new Error(envErrorResponse);
  }

  key = awsEnvPrefix + 'BUCKET_NAME';
  const bucketName = process.env[key];
  if (!bucketName) {
    throw new Error(envErrorResponse);
  }

  key = 'PORT';
  const port = process.env[key] || '8080';
  
  return {
    accessKeyId,
    secretAccessKey,
    bucketName,
    port,
  };
};

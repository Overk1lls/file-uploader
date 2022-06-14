import { config as dotenvInit } from 'dotenv';

dotenvInit();

export interface Config {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  port: number;
}

const awsEnvPrefix = 'AWS_';

export function extractConfig(): Config {
  let key = awsEnvPrefix + 'ACCESS_KEY_ID';

  const accessKeyId = process.env[key];
  if (!accessKeyId) {
    throw new Error(`Env ${key} is missing!`);
  }

  key = awsEnvPrefix + 'SECRET_ACCESS_KEY';
  const secretAccessKey = process.env[key];
  if (!secretAccessKey) {
    throw new Error(`Env ${key} is missing!`);
  }

  key = awsEnvPrefix + 'BUCKET_NAME';
  const bucketName = process.env[key];
  if (!bucketName) {
    throw new Error(`Env ${key} is missing!`);
  }

  const port = Number.parseInt(process.env['PORT'] ?? '8080');

  return {
    accessKeyId,
    secretAccessKey,
    bucketName,
    port,
  };
}

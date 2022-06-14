import { extractConfig } from "../../src/lib/config";

const awsEnvPrefix = 'AWS_';
const accessKeyIdEnvVarName = awsEnvPrefix + 'ACCESS_KEY_ID';
const secretKeyEnvVarName = awsEnvPrefix + 'SECRET_ACCESS_KEY';
const bucketNameEnvVar = awsEnvPrefix + 'BUCKET_NAME';

beforeEach(() => {
    process.env[accessKeyIdEnvVarName] = '1';
    process.env[secretKeyEnvVarName] = '2';
    process.env[bucketNameEnvVar] = '3';
});

describe('Config Lib Test', () => {
    test('Variables are configured', () => {
        const config = extractConfig();

        expect(config).toHaveProperty('accessKeyId');
        expect(config).toHaveProperty('secretAccessKey');
        expect(config).toHaveProperty('bucketName');
        expect(config).toHaveProperty('port');
    });

    test('accessKeyId is missing', () => {
        delete process.env[accessKeyIdEnvVarName];

        expect(() => extractConfig()).toThrowError(`Env ${accessKeyIdEnvVarName} is missing!`);
    });

    test('secretAccessKey is missing', () => {
        delete process.env[secretKeyEnvVarName];

        expect(() => extractConfig()).toThrowError(`Env ${secretKeyEnvVarName} is missing!`);
    });

    test('bucketName is missing', () => {
        delete process.env[bucketNameEnvVar];

        expect(() => extractConfig()).toThrowError(`Env ${bucketNameEnvVar} is missing!`);
    });
});
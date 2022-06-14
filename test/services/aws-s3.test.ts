import { fileName, multerFile } from '../config';
import { s3Service } from '../../src/index';

afterEach(async () => {
    await s3Service.deleteFile(fileName);
});

describe('S3 Service Test', () => {
    test('uploadFile() test (not image)', async () => {
        const notImgFile: Express.Multer.File = { ...multerFile, mimetype: 'application/test' };
        const location = await s3Service.uploadFile(notImgFile);
        expect(location).toBeDefined();
    });

    test('uploadFile() test (image)', async () => {
        const location = await s3Service.uploadFile(multerFile);
        expect(location).toBeDefined();
    });
});
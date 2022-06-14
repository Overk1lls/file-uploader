import { ImageDTO } from '../../src/interfaces/image.dto';
import { file } from '../config';
import { resizeImage } from '../../src/lib/file';

describe('File Lib Test', () => {
    test('resizeImage() test with >2048 size', async () => {
        const mockImage: ImageDTO = {
            file,
            width: 2049,
            height: 2049
        };
        const resizedImg = await resizeImage(mockImage);

        expect(resizedImg).toBeInstanceOf(Buffer);
    });

    test('resizeImage() test with <300 size', async () => {
        const mockImage: ImageDTO = {
            file,
            width: 299,
            height: 299
        };
        const resizedImg = await resizeImage(mockImage);

        expect(resizedImg).toBeInstanceOf(Buffer);
    });
});
import imageSize from 'image-size';
import { readFileSync } from 'fs';
import { ErrorCode } from '../errors/codes';
import { LogicError } from '../errors/logic.error';
import { resizeFile } from '../lib/image';
import { FilesRepository } from '../repositories/files.repository';

const imgType = 'image/';

export class AWSS3Service {
    private readonly files: FilesRepository;

    constructor(files: FilesRepository) {
        this.files = files;
    }

    async uploadFile(file: Readonly<Express.Multer.File>) {
        const { originalname, path, mimetype } = file;
        if (!mimetype.includes(imgType)) {
            const { Location } = await this.files.upload({
                mimetype,
                name: originalname,
                pathToFile: path
            });
            return Location;
        }
        
        const savedFile = readFileSync(path);
        const dimensions = imageSize(savedFile);

        const { height, width } = dimensions;
        if (!height || !width) {
            throw new LogicError(ErrorCode.FileSizeNotFound);
        }
        const appropriateSizeImg = await resizeFile({ file: savedFile, height, width });

        const { Location } = await this.files.upload({
            mimetype,
            name: originalname,
            file: appropriateSizeImg
        });
        return Location;
    }
}
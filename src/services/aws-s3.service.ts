import imageSize from 'image-size';
import { ErrorCode } from '../errors/codes';
import { LogicError } from '../errors/logic.error';
import { resizeImage } from '../lib/file';
import { FilesRepository } from '../repositories/files.repository';

const imgType = 'image/';

export class AWSS3Service {
  private readonly files: FilesRepository;

  constructor(files: FilesRepository) {
    this.files = files;
  }

  async uploadFile(file: Readonly<Express.Multer.File>) {
    const { buffer, mimetype } = file;

    if (!mimetype.includes(imgType)) {
      const { Location } = await this.files.uploadFile(file);
      return Location;
    }

    const dimensions = imageSize(buffer);
    const { height, width } = dimensions;
    if (!height || !width) {
      throw new LogicError(ErrorCode.FileNotAppropriate);
    }
    const appropriateSizeImg = await resizeImage({ file: buffer, width, height });

    const { Location } = await this.files.uploadFile({ ...file, buffer: appropriateSizeImg });
    return Location;
  }

  async deleteFile(name: string) {
    const { $response } = await this.files.deleteFile(name);
    return $response;
  }
}

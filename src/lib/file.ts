import sharp from "sharp";
import { ImageDTO } from "../interfaces/image.dto";

export const resizeImage = async (image: ImageDTO) => {
    const { file, width, height } = image;
    let toWidth: number;
    let toHeight: number;

    if (width > 2048) {
        toWidth = 2048;
    }
    if (height > 2048) {
        toHeight = 2048;
    }
    if (width < 300) {
        toWidth = 300;
    }
    if (height < 300) {
        toHeight = 300;
    }
    return sharp(file).resize(width, height).toBuffer();
};


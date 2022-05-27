import sharp from "sharp";

export const toResizeObject = async (file: Buffer) => {
    return {
        large: await sharp(file).resize(2048, 2048).toBuffer(),
        medium: await sharp(file).resize(1024, 1024).toBuffer(),
        thumb: await sharp(file).resize(300, 300).toBuffer(),
    };
};

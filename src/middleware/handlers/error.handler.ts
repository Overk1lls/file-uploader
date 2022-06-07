import { ErrorRequestHandler } from "express";
import { MulterError } from "multer";
import { ErrorCode } from "../../errors/codes";
import { LogicError } from "../../errors/logic.error";
import { ServerError } from "../../errors/server.error";

enum ErrorHandlerResponse {
    SomethingWrong = 'SOMETHING_WENT_WRONG',
};

export const RequestErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof LogicError) {
        switch (err.code) {
            case ErrorCode.FileNotAppropriate: {
                res.status(400).json({
                    error: err.message,
                    code: err.code,
                });
            }

            default: {
                res.status(400).json({
                    error: 'File is not found!',
                    code: ErrorCode.FileIsNotFound,
                });
                break;
            }
        }
    } else if (err instanceof ServerError) {
        switch (err.code) {
            default: {
                res.status(500).json({
                    error: ErrorHandlerResponse.SomethingWrong,
                    code: ErrorCode.FileIsNotUploaded,
                });
                break;
            }
        }
    } else if (err instanceof MulterError) {
        switch (err.code) {
            case 'LIMIT_FILE_SIZE': {
                res.status(400).json({
                    error: 'The file size is too big to upload!',
                    code: err.code,
                });
                break;
            }

            default: {
                res.status(400).json({
                    error: 'Could not upload your file',
                    code: ErrorCode.FileIsNotUploaded,
                });
                break;
            }
        }
    } else {
        res.status(500).json({ error: ErrorHandlerResponse.SomethingWrong });
    }
};
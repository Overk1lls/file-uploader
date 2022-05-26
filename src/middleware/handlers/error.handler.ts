import { ErrorRequestHandler } from "express";
import { ErrorCode } from "../../errors/codes";
import { LogicError } from "../../errors/logic.error";
import { ServerError } from "../../errors/server.error";

enum ErrorHandlerResponse {
    somethingWrong = 'SOMETHING_WENT_WRONG',
};

export const RequestErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof LogicError) {
        switch (err.code) {
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
                    error: ErrorHandlerResponse.somethingWrong,
                    code: ErrorCode.FileIsNotUploaded,
                });
                break;
            }
        }
    } else {
        res.status(500).json({ error: ErrorHandlerResponse.somethingWrong });
    }
};
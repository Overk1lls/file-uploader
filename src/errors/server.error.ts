import { ErrorCode } from "./codes";
import { LogicError } from "./logic.error";

export class ServerError extends LogicError {
    constructor(code: ErrorCode, message?: string) {
        super(code, message);
    }
}
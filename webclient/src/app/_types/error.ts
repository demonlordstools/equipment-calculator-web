import { ErrorType } from "./error-type";

export interface Error {
    type: ErrorType;
    message: string;
}

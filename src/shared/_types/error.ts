import { ErrorType } from './error-type';

export interface Error {
    type: ErrorType;
    message: string;
}

export const WEBSOCKET_ERROR_CODE = 1011;

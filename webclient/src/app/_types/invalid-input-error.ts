import { Error } from './error';
import { ErrorType } from './error-type';

export class InvalidInputError implements Error {
    public type = ErrorType.INVALID_INPUT;

    constructor(public message: string) {}
}

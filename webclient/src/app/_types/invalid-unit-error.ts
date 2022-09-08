import { Error } from './error';
import { ErrorType } from './error-type';

export class InvalidUnitError implements Error {
    public type = ErrorType.INVALID_UNIT;

    constructor(public message: string) {}
}

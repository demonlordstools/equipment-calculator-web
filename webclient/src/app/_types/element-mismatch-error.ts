import { ErrorType } from './error-type';
import { Error } from './error';

export class ElementMismatchError implements Error {
    public type = ErrorType.ELEMENT_MISMATCH;

    constructor(public message: string = 'Die gewählten Elemente passen nicht zusammen.') {}
}

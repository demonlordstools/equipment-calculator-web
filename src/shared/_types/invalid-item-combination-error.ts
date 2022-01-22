import { Error } from './error';
import { ErrorType } from './error-type';

export class InvalidItemCombinationError implements Error {
    public type = ErrorType.INVALID_ITEM_COMBINATION;

    constructor(public message: string) {}
}

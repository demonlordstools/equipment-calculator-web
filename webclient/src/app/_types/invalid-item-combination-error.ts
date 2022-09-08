import { ErrorType } from "./error-type";
import { Error } from "./error";

export class InvalidItemCombinationError implements Error {
    public type = ErrorType.INVALID_ITEM_COMBINATION;

    constructor(public message: string = "Es existiert keine Ausrüstungs-Kombination, die der Anfrage entspricht.") {
    }
}

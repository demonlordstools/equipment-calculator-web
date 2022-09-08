import { Element } from "../../../_types/element";

export interface BaseDataFormData {
    waffenschmiede: number;
    schmiedekunst: number;
    selectedUnit: string;
    elementAttack?: Element;
    elementDefense?: Element;
    ranged: boolean;
    carryWeight?: number;
    unitElement?: Element;
    rangedRequired: boolean;
    rangedForbidden: boolean;
}

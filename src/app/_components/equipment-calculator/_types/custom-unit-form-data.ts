import { Element } from '../../../../shared/_types/element';

export interface CustomUnitFormData {
    ap: number;
    vp: number;
    hp: number;
    mp: number;
    carryWeight: number;
    element: Element;
    ranged: boolean;
}

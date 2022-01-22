import { Element } from '../../../../shared/_types/element';

export interface BaseDataFormData {
    waffenschmiede: number;
    schmiedekunst: number;
    selectedUnit: string;
    elementAttack?: Element;
    elementDefense?: Element;
}

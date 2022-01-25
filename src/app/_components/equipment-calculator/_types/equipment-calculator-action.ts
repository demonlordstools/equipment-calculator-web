import { Action } from '../../../_types/action';

import { BaseDataFormData } from './base-data-form-data';
import { CustomUnitFormData } from './custom-unit-form-data';
import { StatWeightingFormData } from './stat-weighting-form-data';

export class CalculateEquipment extends Action {}

export class UpdateBaseData extends Action {
    constructor(public data: BaseDataFormData) {
        super();
    }
}

export class UpdateCustomUnitData extends Action {
    constructor(public data: CustomUnitFormData) {
        super();
    }
}

export class UpdateStatWeightingData extends Action {
    constructor(public data: StatWeightingFormData) {
        super();
    }
}

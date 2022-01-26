import { Action } from '../../../_types/action';
import { Element } from '../../../../shared/_types/element';

import { StatWeightingFormData } from './stat-weighting-form-data';

export class UpdateWaffenschmiede extends Action {
    constructor(public waffenschmiede: number) {
        super();
    }
}

export class UpdateSchmiedekunst extends Action {
    constructor(public schmiedekunst: number) {
        super();
    }
}

export class UpdateSelectedUnit extends Action {
    constructor(public selectedUnit?: string) {
        super();
    }
}

export class UpdateCarryWeight extends Action {
    constructor(public carryWeight: number) {
        super();
    }
}

export class UpdateUnitElement extends Action {
    constructor(public element: Element) {
        super();
    }
}

export class UpdateRanged extends Action {
    constructor(public ranged: boolean) {
        super();
    }
}

export class UpdateRangedRequired extends Action {
    constructor(public rangedRequired: boolean) {
        super();
    }
}

export class UpdateRangedForbidden extends Action {
    constructor(public rangedForbidden: boolean) {
        super();
    }
}

export class UpdateAttackElement extends Action {
    constructor(public element?: Element) {
        super();
    }
}

export class UpdateDefenseElement extends Action {
    constructor(public element?: Element) {
        super();
    }
}

export class CalculateEquipment extends Action {}

export class UpdateStatWeightingData extends Action {
    constructor(public data: StatWeightingFormData) {
        super();
    }
}

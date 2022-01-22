import { EquipmentSet } from '../../../../shared/_types/equipment-set';
import { Unit } from '../../../_types/unit';
import { Element } from '../../../../shared/_types/element';
import { Error } from '../../../../shared/_types/error';

export class EquipmentState {
    waffenschmiede = 0;
    schmiedekunst = 0;
    selectedUnit?: Unit;
    elementAttack?: Element;
    elementDefense?: Element;

    customUnitSelected = false;

    apWeight = 0;
    vpWeight = 0;
    hpWeight = 0;
    mpWeight = 0;

    set?: EquipmentSet;
    status = IDLE_STATUS;
}

interface Status {
    loading: boolean;
    error?: Error;
    idle: boolean;
}

const IDLE_STATUS: Status = {
    loading: false,
    error: undefined,
    idle: true,
};

const LOADING_STATUS: Status = {
    loading: true,
    error: undefined,
    idle: false,
};

function errorStatus(error: Error): Status {
    return {
        loading: false,
        error: error,
        idle: false,
    };
}

export const IDLE_STATE: Partial<EquipmentState> = {
    status: IDLE_STATUS,
};

export const LOADING_STATE: Partial<EquipmentState> = {
    status: LOADING_STATUS,
};

export function errorState(error: Error): Partial<EquipmentState> {
    return {
        status: errorStatus(error),
    };
}

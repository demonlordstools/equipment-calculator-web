import { ap, Equipment, hp, mp, vp } from './equipment';

export interface EquipmentSet {
    weapon: Equipment;
    shield: Equipment;
    helmet: Equipment;
    armour: Equipment;
    accessory: Equipment;
}

function allItems(set?: EquipmentSet): Array<Equipment> {
    return set ? Object.values(set) : [];
}

export function totalAP(set?: EquipmentSet, schmiedekunst = 0): number {
    return allItems(set).reduce((acc, curr) => acc + ap(curr, schmiedekunst), 0);
}

export function totalVP(set?: EquipmentSet, schmiedekunst = 0): number {
    return allItems(set).reduce((acc, curr) => acc + vp(curr, schmiedekunst), 0);
}

export function totalHP(set?: EquipmentSet, schmiedekunst = 0): number {
    return allItems(set).reduce((acc, curr) => acc + hp(curr, schmiedekunst), 0);
}

export function totalMP(set?: EquipmentSet, schmiedekunst = 0): number {
    return allItems(set).reduce((acc, curr) => acc + mp(curr, schmiedekunst), 0);
}

export function totalWeight(set?: EquipmentSet): number {
    return allItems(set).reduce((acc: number, curr: Equipment) => acc + curr.weight, 0);
}

export function getWeightedTotalStats(
    set?: EquipmentSet,
    apWeight = 0,
    vpWeight = 0,
    hpWeight = 0,
    mpWeight = 0
): number {
    if (!set) return 0;
    return apWeight + vpWeight + hpWeight + mpWeight === 0
        ? setAP(set) + setVP(set) + setHP(set) + setMP(set)
        : setAP(set) * apWeight + setVP(set) * vpWeight + setHP(set) * hpWeight + setMP(set) * mpWeight;
}

function setAP(set: EquipmentSet): number {
    return allItems(set).reduce((acc, curr) => acc + curr.ap, 0);
}

function setVP(set: EquipmentSet): number {
    return allItems(set).reduce((acc, curr) => acc + curr.vp, 0);
}

function setHP(set: EquipmentSet): number {
    return allItems(set).reduce((acc, curr) => acc + curr.hp, 0);
}

function setMP(set: EquipmentSet): number {
    return allItems(set).reduce((acc, curr) => acc + curr.mp, 0);
}

import { ap, Equipment, hp, mp, vp } from "./equipment";

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

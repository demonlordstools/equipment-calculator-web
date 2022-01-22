import { UnitType } from './unit-type';
import { Element } from '../../shared/_types/element';

export const CUSTOM_UNIT_NAME = 'Custom';

export interface Unit {
    name: string;
    type: UnitType;
    carryWeight: number;
    ranged: boolean;
    element: Element;
    kp: number;
    ap: number;
    vp: number;
    hp: number;
    mp: number;
}

const units: Array<Unit> = [
    unit(CUSTOM_UNIT_NAME, UnitType.NONE, 0, true, Element.NONE, 0, 0, 0, 0, 0),
    unit('Späher', UnitType.HUMAN, 30, true, Element.NONE, 10, 30, 55, 32, 0),
    unit('Magier', UnitType.HUMAN, 20, false, Element.NONE, 15, 20, 15, 49, 50),
    unit('Kreuzritter', UnitType.HUMAN, 120, false, Element.NONE, 25, 120, 75, 115, 0),
    unit('Drachenjäger', UnitType.HUMAN, 270, true, Element.NONE, 40, 300, 120, 300, 0),
    unit('Pikenier', UnitType.HUMAN, 350, false, Element.NONE, 60, 1000, 350, 540, 0),
    unit('Erzengel', UnitType.HUMAN, 430, false, Element.AIR, 80, 780, 640, 730, 200),
    unit('Titan', UnitType.HUMAN, 580, false, Element.EARTH, 120, 1800, 1500, 2500, 0),
    unit('Skelettkrieger', UnitType.UNDEAD, 50, true, Element.NONE, 20, 110, 70, 110, 0),
    unit('Lich', UnitType.UNDEAD, 170, false, Element.NONE, 60, 155, 120, 195, 30),
    unit('Teufel', UnitType.UNDEAD, 520, false, Element.NONE, 90, 900, 1000, 1000, 0),
    unit('Ifrit', UnitType.UNDEAD, 360, false, Element.FIRE, 210, 1930, 1720, 2550, 0),
    unit('Daktyle', UnitType.DEMON, 250, false, Element.NONE, 100, 1350, 775, 1050, 300),
    unit('Jötun', UnitType.DEMON, 200, true, Element.NONE, 140, 1120, 800, 1425, 0),
    unit('Thurse', UnitType.DEMON, 650, false, Element.EARTH, 235, 4325, 3120, 4100, 0),
    unit('Tyr', UnitType.DEMON, 900, false, Element.NONE, 300, 3950, 3260, 4510, 0),
    unit('Luftelementar', UnitType.ELEMENTAL, 375, true, Element.AIR, 100, 2700, 2500, 2390, 0),
    unit('Banshee', UnitType.GHOST, 150, false, Element.AIR, 120, 245, 1950, 3000, 625),
    unit('Hüter des Silberhains', UnitType.GHOST, 350, false, Element.ICE, 145, 1480, 1700, 1850, 55),
    unit('Harlekin', UnitType.GHOST, 200, true, Element.NONE, 140, 2100, 1950, 2150, 0),
];

export const ALL_UNITS = new Map(units.map((unit) => [unit.name, unit]));

export function unitByName(name: string | undefined): Unit | undefined {
    return name ? ALL_UNITS.get(name) : undefined;
}

function unit(
    name: string,
    type: UnitType,
    carryWeight: number,
    ranged: boolean,
    element: Element,
    kp: number,
    ap: number,
    vp: number,
    hp: number,
    mp: number
): Unit {
    return {
        name,
        type,
        carryWeight,
        ranged,
        element,
        kp,
        ap,
        vp,
        hp,
        mp,
    };
}

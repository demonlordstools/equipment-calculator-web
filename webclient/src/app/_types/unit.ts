import { Element } from "./element";
import { UnitType } from "./unit-type";

export const CUSTOM_UNIT_NAME = "Custom";

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
    unit("Späher", UnitType.HUMAN, 20, true, Element.NONE, 10, 30, 55, 32, 0),
    unit("Kreuzritter", UnitType.HUMAN, 160, false, Element.NONE, 25, 120, 75, 215, 0),
    unit("Drachenjäger", UnitType.HUMAN, 270, true, Element.NONE, 40, 300, 120, 300, 0),
    unit("Pikenier", UnitType.HUMAN, 350, false, Element.NONE, 60, 1050, 350, 540, 0),
    unit("Erzengel", UnitType.HUMAN, 430, false, Element.AIR, 80, 780, 640, 930, 200),
    unit("Titan", UnitType.HUMAN, 580, false, Element.EARTH, 120, 900, 3600, 4700, 0),
    unit("Lich", UnitType.UNDEAD, 170, false, Element.NONE, 60, 155, 120, 195, 30),
    unit("Knochendrache", UnitType.UNDEAD, 200, true, Element.NONE, 200, 0, 0, 0, 0),
    unit("Teufel", UnitType.UNDEAD, 360, false, Element.NONE, 90, 1000, 1400, 1500, 0),
    unit("Ifrit", UnitType.UNDEAD, 650, false, Element.NONE, 210, 1930, 4000, 2550, 0),
    unit("Daktyle", UnitType.DEMON, 250, false, Element.NONE, 80, 1000, 775, 1050, 300),
    unit("Jötun", UnitType.DEMON, 200, true, Element.NONE, 140, 1420, 800, 1425, 0),
    unit("Thurse", UnitType.DEMON, 650, false, Element.EARTH, 240, 5515, 5185, 4985, 0),
    unit("Tyr", UnitType.DEMON, 1230, false, Element.NONE, 300, 6200, 5200, 7200, 0),
    unit("Eiselementar", UnitType.ELEMENTAL, 200, false, Element.ICE, 50, 670, 570, 840, 150),
    unit("Luftelementar", UnitType.ELEMENTAL, 200, true, Element.AIR, 50, 2700, 2500, 2390, 0),
    unit("Feuerelementar", UnitType.ELEMENTAL, 200, true, Element.FIRE, 50, 2700, 2500, 2390, 0),
    unit("Erdelementar", UnitType.ELEMENTAL, 200, true, Element.EARTH, 50, 2700, 2500, 2390, 0),
    unit("Banshee", UnitType.GHOST, 150, false, Element.AIR, 100, 245, 1950, 3000, 625),
    unit("Hüter des Silberhains", UnitType.HUMAN, 350, false, Element.NONE, 125, 2480, 1700, 4000, 0),
    unit("Harlekin", UnitType.DEMON, 200, true, Element.NONE, 50, 2350, 1950, 2150, 0),
    unit("Varsillischer Riese", UnitType.HUMAN, 650, false, Element.EARTH, 75, 2150, 2200, 4800, 0)
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
        mp
    };
}

import {
    combineElements,
    Element,
    getWantedDefenseElements,
    getWantedWeaponElements,
    isValidElementCombination,
} from '../shared/_types/element';
import {
    ALL_ACCESSORIES,
    ALL_ARMOUR,
    ALL_HELMETS,
    ALL_SHIELDS,
    ALL_WEAPONS,
    Equipment,
    MAX_WEIGHT_BONUS,
    validWeightAndElements,
} from '../shared/_types/equipment';
import { EquipmentSet, getWeightedTotalStats } from '../shared/_types/equipment-set';
import { ElementMismatchError } from '../shared/_types/element-mismatch-error';
import { Request, Response } from 'express';

export function calculateEquipmentController(req: Request, res: Response): void {
    const carryWeight = intParameter(req, 'carryWeight');
    const element = elementParameter(req, 'element');
    const ranged = booleanParameter(req, 'ranged');
    const waffenschmiede = intParameter(req, 'waffenschmiede');
    const apWeight = intParameter(req, 'apWeight');
    const vpWeight = intParameter(req, 'vpWeight');
    const hpWeight = intParameter(req, 'hpWeight');
    const mpWeight = intParameter(req, 'mpWeight');
    const elementAttack = optionalElementParameter(req, 'elementAttack');
    const elementDefense = optionalElementParameter(req, 'elementDefense');

    calculateEquipment(
        carryWeight,
        element,
        ranged,
        waffenschmiede,
        apWeight,
        vpWeight,
        hpWeight,
        mpWeight,
        elementAttack,
        elementDefense
    )
        .then((set) => res.send(JSON.stringify(set)))
        .catch((error) => res.status(500).send(error));
}

function calculateEquipment(
    carryWeight: number,
    element: Element,
    ranged: boolean,
    waffenschmiede: number,
    apWeight: number,
    vpWeight: number,
    hpWeight: number,
    mpWeight: number,
    elementAttack?: Element,
    elementDefense?: Element
): Promise<EquipmentSet> {
    return new Promise<EquipmentSet>((resolve, reject) => {
        if (!isValidElementCombination(element, elementAttack, elementDefense)) {
            reject(
                new ElementMismatchError(
                    `Invalid element combination "${element}", "${elementAttack}" and "${elementDefense}"!`
                )
            );
            return;
        }

        const wantedWeaponElements = getWantedWeaponElements(element, elementAttack);
        const wantedDefenseElements = getWantedDefenseElements(element, elementDefense);

        const validWeapons = filterInvalidItems(carryWeight, ranged, waffenschmiede, ALL_WEAPONS, wantedWeaponElements);
        const validHelmets = filterInvalidItems(carryWeight, ranged, waffenschmiede, ALL_HELMETS);
        const validArmour = filterInvalidItems(carryWeight, ranged, waffenschmiede, ALL_ARMOUR, wantedDefenseElements);
        const validShields = filterInvalidItems(
            carryWeight,
            ranged,
            waffenschmiede,
            ALL_SHIELDS,
            wantedDefenseElements
        );
        const validAccessories = filterInvalidItems(carryWeight, ranged, waffenschmiede, ALL_ACCESSORIES);

        getBestItemCombination(
            element,
            carryWeight,
            apWeight,
            vpWeight,
            hpWeight,
            mpWeight,
            validWeapons,
            validHelmets,
            validArmour,
            validShields,
            validAccessories,
            elementAttack,
            elementDefense
        )
            .then(resolve)
            .catch(reject);
    });
}

function getBestItemCombination(
    element: Element,
    maxWeight: number,
    apWeight: number,
    vpWeight: number,
    hpWeight: number,
    mpWeight: number,
    validWeapons: Array<Equipment>,
    validHelmets: Array<Equipment>,
    validArmour: Array<Equipment>,
    validShields: Array<Equipment>,
    validAccessories: Array<Equipment>,
    targetAttackElement?: Element,
    targetDefenseElement?: Element
): Promise<EquipmentSet> {
    return new Promise((resolve) => {
        let totalIterations = 0;
        let validItemCombinations = 0;
        let result: EquipmentSet | undefined = undefined;
        const start = new Date();

        for (const weapon of validWeapons) {
            if (targetAttackElement && combineElements(element, weapon.element) !== targetAttackElement) continue;
            for (const armour of validArmour) {
                if (!validWeightAndElements(maxWeight, weapon, armour)) continue;
                for (const shield of validShields) {
                    if (!validWeightAndElements(maxWeight, weapon, armour, shield)) continue;
                    if (
                        targetDefenseElement &&
                        combineElements(element, armour.element, shield.element) !== targetDefenseElement
                    )
                        continue;
                    for (const helmet of validHelmets) {
                        if (!validWeightAndElements(maxWeight, weapon, armour, shield, helmet)) continue;
                        for (const accessory of validAccessories) {
                            totalIterations++;
                            if (validWeightAndElements(maxWeight, weapon, armour, shield, helmet, accessory)) {
                                validItemCombinations++;
                                const newSet: EquipmentSet = { weapon, armour, shield, helmet, accessory };
                                result =
                                    getWeightedTotalStats(newSet, apWeight, vpWeight, hpWeight, mpWeight) >
                                    getWeightedTotalStats(result, apWeight, vpWeight, hpWeight, mpWeight)
                                        ? newSet
                                        : result;
                            }
                        }
                    }
                }
            }
        }

        const end = new Date();
        console.debug(`>>> took ${(end.getTime() - start.getTime()) / 1000}s.`);
        console.debug('>>> total iterations:', totalIterations);
        console.debug('>>> valid combinations:', validItemCombinations);
        if (!result) throw 'Unable to find item combination';
        resolve(result);
    });
}

function filterInvalidItems(
    carryWeight: number,
    unitRanged: boolean,
    waffenschmiede: number,
    equipment: Array<Equipment>,
    wantedElements: Array<Element> = []
): Array<Equipment> {
    return equipment.filter(
        ({ element, ranged, requiredWaffenschmiede, weight }) =>
            waffenschmiede >= requiredWaffenschmiede &&
            carryWeight + MAX_WEIGHT_BONUS >= weight &&
            (unitRanged || !ranged) &&
            (wantedElements.length === 0 || wantedElements.includes(element))
    );
}

function intParameter(request: Request, name: string): number {
    const param: string = request.query[name] as string;
    return Number.parseInt(param);
}

function elementParameter(request: Request, name: string): Element {
    const param: any = request.query[name];
    return !!param ? Element[param as keyof typeof Element] : Element.NONE;
}

function optionalElementParameter(request: Request, name: string): Element | undefined {
    const param: any = request.query[name];
    return !!param ? Element[param as keyof typeof Element] : undefined;
}

function booleanParameter(request: Request, name: string): boolean {
    const param: any = request.query[name];
    return param === 'true';
}
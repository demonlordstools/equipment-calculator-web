import { RawData } from 'ws';

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
import { InvalidItemCombinationError } from '../shared/_types/invalid-item-combination-error';

export function calculateEquipmentController(rawData: RawData): Promise<EquipmentSet> {
    const {
        unitCarryWeight,
        unitElement,
        unitRanged,
        waffenschmiede,
        rangedRequired,
        rangedForbidden,
        apWeight,
        vpWeight,
        hpWeight,
        mpWeight,
        elementAttack,
        elementDefense,
    } = JSON.parse(rawData.toString());

    return calculateEquipment(
        unitCarryWeight,
        unitElement,
        unitRanged,
        waffenschmiede,
        rangedRequired,
        rangedForbidden,
        apWeight,
        vpWeight,
        hpWeight,
        mpWeight,
        elementAttack,
        elementDefense
    );
}

function calculateEquipment(
    unitCarryWeight: number,
    unitElement: Element,
    unitRanged: boolean,
    waffenschmiede: number,
    rangedRequired: boolean,
    rangedForbidden: boolean,
    apWeight: number,
    vpWeight: number,
    hpWeight: number,
    mpWeight: number,
    elementAttack?: Element,
    elementDefense?: Element
): Promise<EquipmentSet> {
    return new Promise<EquipmentSet>((resolve, reject) => {
        if ((rangedRequired && rangedForbidden) || (rangedRequired && !unitRanged)) {
            reject(
                new InvalidItemCombinationError(
                    `Invalid ranged parameters. Unit can use ranged weapons: ${unitRanged} | rangedRequired: ${rangedRequired} | rangedForbidden: ${rangedForbidden}`
                )
            );
        }
        if (!isValidElementCombination(unitElement, elementAttack, elementDefense)) {
            reject(
                new ElementMismatchError(
                    `Invalid element combination "${unitElement}", "${elementAttack}" and "${elementDefense}"!`
                )
            );
            return;
        }

        const wantedWeaponElements = getWantedWeaponElements(unitElement, elementAttack);
        const wantedDefenseElements = getWantedDefenseElements(unitElement, elementDefense);
        const maxWeight = unitCarryWeight + MAX_WEIGHT_BONUS;

        const validWeapons = filterInvalidItems(
            unitElement,
            maxWeight,
            unitRanged,
            waffenschmiede,
            ALL_WEAPONS,
            wantedWeaponElements,
            rangedRequired,
            rangedForbidden
        );
        const validHelmets = filterInvalidItems(unitElement, maxWeight, unitRanged, waffenschmiede, ALL_HELMETS);
        const validArmour = filterInvalidItems(
            unitElement,
            maxWeight,
            unitRanged,
            waffenschmiede,
            ALL_ARMOUR,
            wantedDefenseElements
        );
        const validShields = filterInvalidItems(
            unitElement,
            maxWeight,
            unitRanged,
            waffenschmiede,
            ALL_SHIELDS,
            wantedDefenseElements
        );
        const validAccessories = filterInvalidItems(
            unitElement,
            maxWeight,
            unitRanged,
            waffenschmiede,
            ALL_ACCESSORIES
        );

        getBestItemCombination(
            unitElement,
            unitCarryWeight,
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
    carryWeight: number,
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
        let result: EquipmentSet | undefined = undefined;
        const maxWeight = carryWeight + MAX_WEIGHT_BONUS;

        for (const weapon of validWeapons) {
            if (targetAttackElement && combineElements(element, weapon.element) !== targetAttackElement) continue;
            for (const armour of validArmour) {
                if (!validWeightAndElements(element, maxWeight, weapon, armour)) continue;
                for (const shield of validShields) {
                    if (!validWeightAndElements(element, maxWeight, weapon, armour, shield)) continue;
                    if (
                        targetDefenseElement &&
                        combineElements(element, armour.element, shield.element) !== targetDefenseElement
                    )
                        continue;
                    for (const helmet of validHelmets) {
                        if (!validWeightAndElements(element, maxWeight, weapon, armour, shield, helmet)) continue;
                        for (const accessory of validAccessories) {
                            if (
                                validWeightAndElements(element, carryWeight, weapon, armour, shield, helmet, accessory)
                            ) {
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

        if (!result) throw 'Unable to find item combination';
        resolve(result);
    });
}

function filterInvalidItems(
    unitElement: Element,
    maxWeight: number,
    unitRanged: boolean,
    waffenschmiede: number,
    equipment: Array<Equipment>,
    wantedElements: Array<Element> = [],
    rangedRequired = false,
    rangedForbidden = false
): Array<Equipment> {
    return equipment.filter(
        ({ element, ranged, requiredWaffenschmiede, weight }) =>
            isValidElementCombination(unitElement, element) &&
            waffenschmiede >= requiredWaffenschmiede &&
            maxWeight >= weight &&
            !(rangedRequired && !ranged) &&
            !(rangedForbidden && ranged) &&
            (unitRanged || !ranged) &&
            (wantedElements.length === 0 || wantedElements.includes(element))
    );
}

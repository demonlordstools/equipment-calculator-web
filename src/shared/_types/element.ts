import { ElementMismatchError } from './element-mismatch-error';

export enum Element {
    NONE = 'NONE',
    FIRE = 'FIRE',
    EARTH = 'EARTH',
    AIR = 'AIR',
    ICE = 'ICE',
    FIRE_AIR = 'FIRE_AIR',
    EARTH_ICE = 'EARTH_ICE',
}

// @ts-ignore
export const elements = Object.keys(Element).map((k) => Element[k]);

/**
 * checks if any number of elements can be combined in one equipment set.
 */
export function isValidElementCombination(...elements: Array<Element | undefined>): boolean {
    let resultingElement = Element.NONE;
    const filtered: Array<Element> = elements.filter((element) => !!element) as Array<Element>;
    try {
        filtered.forEach((element) => {
            resultingElement = combineElements(resultingElement, element);
        });
        return true;
    } catch {
        return false;
    }
}

function getValidElementCombinations(unitElement: Element): Array<Element> {
    if (unitElement === Element.NONE) return [Element.NONE, Element.FIRE, Element.EARTH, Element.ICE, Element.AIR];
    if ([Element.FIRE_AIR, Element.FIRE, Element.AIR].includes(unitElement))
        return [Element.NONE, Element.FIRE, Element.AIR];
    if ([Element.EARTH_ICE, Element.EARTH, Element.ICE].includes(unitElement))
        return [Element.NONE, Element.EARTH, Element.ICE];
    return [];
}

export function getWantedWeaponElements(unitElement: Element, targetElement?: Element): Array<Element> {
    if (!attackElementAchievable(unitElement, targetElement))
        throw new ElementMismatchError(
            `The desired element combination is not achievable! Requested attack element "${targetElement}" for unit with element "${unitElement}"`
        );
    if (!targetElement) return getValidElementCombinations(unitElement);
    if (unitElement === Element.NONE || targetElement === Element.NONE) return [targetElement];

    if (unitElement === Element.FIRE && targetElement === Element.FIRE) return [Element.NONE, Element.FIRE];
    if (unitElement === Element.FIRE && targetElement === Element.FIRE_AIR) return [Element.AIR];
    if (unitElement === Element.EARTH && targetElement === Element.EARTH) return [Element.NONE, Element.EARTH];
    if (unitElement === Element.EARTH && targetElement === Element.EARTH_ICE) return [Element.ICE];
    if (unitElement === Element.AIR && targetElement === Element.AIR) return [Element.NONE, Element.AIR];
    if (unitElement === Element.AIR && targetElement === Element.FIRE_AIR) return [Element.FIRE];
    if (unitElement === Element.ICE && targetElement === Element.ICE) return [Element.NONE, Element.ICE];
    if (unitElement === Element.ICE && targetElement === Element.EARTH_ICE) return [Element.EARTH];
    if (unitElement === Element.FIRE_AIR && targetElement === Element.FIRE_AIR)
        return [Element.NONE, Element.FIRE, Element.AIR];
    if (unitElement === Element.EARTH_ICE && targetElement === Element.EARTH_ICE)
        return [Element.NONE, Element.EARTH, Element.ICE];

    return [];
}

export function getWantedDefenseElements(unitElement: Element, targetElement?: Element): Array<Element> {
    if (!defenseElementAchievable(unitElement, targetElement))
        throw new ElementMismatchError(
            `The desired element combination is not achievable! Requested defense element "${targetElement}" for unit with element "${unitElement}"`
        );
    if (!targetElement) return getValidElementCombinations(unitElement);
    if (unitElement === Element.NONE) {
        if (targetElement === Element.FIRE_AIR) return [Element.FIRE, Element.AIR];
        if (targetElement === Element.EARTH_ICE) return [Element.EARTH, Element.ICE];
        return targetElement === Element.NONE ? [Element.NONE] : [Element.NONE, targetElement];
    }
    if (targetElement === Element.NONE) return [Element.NONE];

    if (unitElement === Element.FIRE && targetElement === Element.FIRE) return [Element.NONE, Element.FIRE];
    if (unitElement === Element.EARTH && targetElement === Element.EARTH) return [Element.NONE, Element.EARTH];
    if (unitElement === Element.AIR && targetElement === Element.AIR) return [Element.NONE, Element.AIR];
    if (unitElement === Element.ICE && targetElement === Element.ICE) return [Element.NONE, Element.ICE];
    if (targetElement === Element.FIRE_AIR) return [Element.NONE, Element.FIRE, Element.AIR];
    if (targetElement === Element.EARTH_ICE) return [Element.NONE, Element.EARTH, Element.ICE];
    return [];
}

/**
 * checks if a desired attack element is achievable for a unit's element.
 */
export function attackElementAchievable(unitElement: Element, targetElement?: Element): boolean {
    if (!targetElement) return true;
    if (!isValidElementCombination(unitElement, targetElement)) return false;
    if ([Element.FIRE_AIR, Element.EARTH_ICE].includes(targetElement)) return unitElement !== Element.NONE;
    if (targetElement === Element.NONE && unitElement !== Element.NONE) return false;
    if (
        [Element.FIRE_AIR, Element.EARTH_ICE].includes(unitElement) &&
        [Element.FIRE, Element.EARTH, Element.ICE, Element.AIR].includes(targetElement)
    )
        return false;
    return targetElement === unitElement;
}

/**
 * checks if a desired defense element is achievable for a unit's element.
 */
export function defenseElementAchievable(unitElement: Element, targetElement?: Element): boolean {
    if (!targetElement) return true;
    if (!isValidElementCombination(unitElement, targetElement)) return false;
    if ([Element.FIRE_AIR, Element.EARTH_ICE].includes(targetElement)) return true;
    if (targetElement === Element.NONE && unitElement !== Element.NONE) return false;
    if (
        [Element.FIRE_AIR, Element.EARTH_ICE].includes(unitElement) &&
        [Element.FIRE, Element.EARTH, Element.ICE, Element.AIR].includes(targetElement)
    )
        return false;
    return targetElement === unitElement;
}

export function combineElements(...elements: Array<Element>): Element {
    if (elements.length === 0) return Element.NONE;
    if (elements.length === 1) return elements[0];
    if (elements.length === 2) {
        const [element1, element2] = elements;
        if (element1 === element2) return element1;
        if (element1 === Element.NONE) return element2;
        if (element2 === Element.NONE) return element1;
        if (
            (element1 === Element.FIRE || element1 === Element.AIR || element1 === Element.FIRE_AIR) &&
            (element2 === Element.FIRE || element2 === Element.AIR || element2 === Element.FIRE_AIR)
        ) {
            return Element.FIRE_AIR;
        }
        if (
            (element1 === Element.EARTH || element1 === Element.ICE || element1 === Element.EARTH_ICE) &&
            (element2 === Element.EARTH || element2 === Element.ICE || element2 === Element.EARTH_ICE)
        ) {
            return Element.EARTH_ICE;
        }
        throw new ElementMismatchError(`Invalid element combination of ${element1} and ${element2}`);
    }
    const firstCombined = combineElements(elements[0], elements[1]);
    return combineElements(firstCombined, ...elements.slice(2));
}

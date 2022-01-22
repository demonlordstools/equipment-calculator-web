"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidElementCombination = exports.Element = void 0;
var Element;
(function (Element) {
    Element["NONE"] = "NONE";
    Element["FIRE"] = "FIRE";
    Element["EARTH"] = "EARTH";
    Element["AIR"] = "AIR";
    Element["ICE"] = "ICE";
    Element["FIRE_AIR"] = "FIRE_AIR";
    Element["EARTH_ICE"] = "EARTH_ICE";
})(Element = exports.Element || (exports.Element = {}));
function isValidElementCombination(...elements) {
    let resultingElement = Element.NONE;
    try {
        elements.forEach((element) => {
            resultingElement = combineElement(resultingElement, element);
        });
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.isValidElementCombination = isValidElementCombination;
function combineElement(element1, element2) {
    if (element1 === element2)
        return element1;
    if (element1 === Element.NONE)
        return element2;
    if (element2 === Element.NONE)
        return element1;
    if ((element1 === Element.FIRE || element1 === Element.AIR || element1 === Element.FIRE_AIR) &&
        (element2 === Element.FIRE || element2 === Element.AIR || element2 === Element.FIRE_AIR)) {
        return Element.FIRE_AIR;
    }
    if ((element1 === Element.EARTH || element1 === Element.ICE || element1 === Element.EARTH_ICE) &&
        (element2 === Element.EARTH || element2 === Element.ICE || element2 === Element.EARTH_ICE)) {
        return Element.EARTH_ICE;
    }
    throw 'invalid element combination';
}

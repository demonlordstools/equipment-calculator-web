"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const equipment_1 = require("./_types/equipment");
const element_1 = require("./_types/element");
const equipment_set_1 = require("./_types/equipment-set");
const app = (0, express_1.default)();
const port = 3000;
app.use('/', express_1.default.static('dist/dl-equipment-calculator-web/'));
app.get('/equipment', (req, res) => {
    const carryWeight = intParameter(req, 'carryweight');
    const element = elementParameter(req, 'element');
    const ranged = booleanParameter(req, 'ranged');
    const waffenschmiede = intParameter(req, 'waffenschmiede');
    const validWeapons = filterInvalidItems(carryWeight, element, ranged, waffenschmiede, equipment_1.ALL_WEAPONS);
    const validHelmets = filterInvalidItems(carryWeight, element, ranged, waffenschmiede, equipment_1.ALL_HELMETS);
    const validArmour = filterInvalidItems(carryWeight, element, ranged, waffenschmiede, equipment_1.ALL_ARMOUR);
    const validShields = filterInvalidItems(carryWeight, element, ranged, waffenschmiede, equipment_1.ALL_SHIELDS);
    const validAccessories = filterInvalidItems(carryWeight, element, ranged, waffenschmiede, equipment_1.ALL_ACCESSORIES);
    getBestItemCombination(carryWeight, validWeapons, validHelmets, validArmour, validShields, validAccessories).then((set) => res.send(JSON.stringify(set)));
});
function filterInvalidItems(carryWeight, unitElement, unitRanged, waffenschmiede, equipment) {
    return equipment.filter(({ element, ranged, requiredWaffenschmiede, weight }) => waffenschmiede >= requiredWaffenschmiede &&
        carryWeight + equipment_1.MAX_WEIGHT_BONUS >= weight &&
        (unitRanged || !ranged) &&
        (0, element_1.isValidElementCombination)(unitElement, element));
}
function getBestItemCombination(maxWeight, validWeapons, validHelmets, validArmour, validShields, validAccessories) {
    return new Promise((resolve) => {
        let totalIterations = 0;
        let validItemCombinations = 0;
        let result = undefined;
        const start = new Date();
        for (const weapon of validWeapons) {
            for (const helmet of validHelmets) {
                if (!(0, equipment_1.validWeightAndElements)(maxWeight, weapon, helmet))
                    continue;
                for (const armour of validArmour) {
                    if (!(0, equipment_1.validWeightAndElements)(maxWeight, weapon, helmet, armour))
                        continue;
                    for (const shield of validShields) {
                        if (!(0, equipment_1.validWeightAndElements)(maxWeight, weapon, helmet, armour, shield))
                            continue;
                        for (const accessory of validAccessories) {
                            totalIterations++;
                            if ((0, equipment_1.validWeightAndElements)(maxWeight, weapon, helmet, armour, shield, accessory)) {
                                validItemCombinations++;
                                const newSet = { weapon, helmet, armour, shield, accessory };
                                result =
                                    (0, equipment_set_1.getWeightedTotalStats)(newSet) > (0, equipment_set_1.getWeightedTotalStats)(result) ? newSet : result;
                            }
                        }
                    }
                }
            }
        }
        const end = new Date();
        console.warn(`>>> took ${(end.getTime() - start.getTime()) / 1000}s.`);
        console.warn('>>> total iterations:', totalIterations);
        console.warn('>>> valid combinations:', validItemCombinations);
        if (!result)
            throw 'Unable to find item combination';
        resolve(result);
    });
}
function intParameter(request, name) {
    const param = request.query[name];
    return Number.parseInt(param);
}
function elementParameter(request, name) {
    const param = request.query[name];
    return element_1.Element[param];
}
function booleanParameter(request, name) {
    const param = request.query[name];
    return param === 'true';
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeightedTotalStats = void 0;
function getWeightedTotalStats(set) {
    // TODO weighting
    return !set ? 0 : ap(set) + vp(set) + hp(set) + mp(set);
}
exports.getWeightedTotalStats = getWeightedTotalStats;
function ap(set) {
    return set.weapon.ap + set.shield.ap + set.helmet.ap + set.armour.ap + set.accessory.ap;
}
function vp(set) {
    return set.weapon.vp + set.shield.vp + set.helmet.vp + set.armour.vp + set.accessory.vp;
}
function hp(set) {
    return set.weapon.hp + set.shield.hp + set.helmet.hp + set.armour.hp + set.accessory.hp;
}
function mp(set) {
    return set.weapon.mp + set.shield.mp + set.helmet.mp + set.armour.mp + set.accessory.mp;
}

import { Component, Input } from "@angular/core";

import { EquipmentSet, totalAP, totalHP, totalMP, totalVP, totalWeight } from "../../../../_types/equipment-set";
import { Element } from "../../../../_types/element";

@Component({
    selector: "app-equipment-set",
    templateUrl: "./equipment-set.component.html",
    styleUrls: ["./equipment-set.component.scss"]
})
export class EquipmentSetComponent {
    @Input() unitElement = Element.NONE;
    @Input() set?: EquipmentSet;
    @Input() compareWith?: EquipmentSet;
    @Input() schmiedekunst = 0;

    totalAP = totalAP;
    totalVP = totalVP;
    totalHP = totalHP;
    totalMP = totalMP;
    totalWeight = totalWeight;

    getOffenseElementIcons(): Set<string> {
        if (!this.set) return new Set<string>();
        const unitElementIcons = this.getElementIcons(this.unitElement);
        const weaponElementIcons = this.getElementIcons(this.set.weapon.element);
        return new Set([...unitElementIcons, ...weaponElementIcons]);
    }

    getDefenseElementIcons(): Set<string> {
        if (!this.set) return new Set<string>();
        const unitElementIcons = this.getElementIcons(this.unitElement);
        const shieldElementIcons = this.getElementIcons(this.set.shield.element);
        const armourElementIcons = this.getElementIcons(this.set.armour.element);
        return new Set([...unitElementIcons, ...shieldElementIcons, ...armourElementIcons]);
    }

    getElementIcons(element: Element): Array<string> {
        const result = [];
        switch (element) {
            case Element.FIRE_AIR:
                result.push("assets/images/fire.gif", "assets/images/wind.gif");
                break;
            case Element.FIRE:
                result.push("assets/images/fire.gif");
                break;
            case Element.AIR:
                result.push("assets/images/wind.gif");
                break;
            case Element.EARTH_ICE:
                result.push("assets/images/earth.gif", "assets/images/ice.gif");
                break;
            case Element.EARTH:
                result.push("assets/images/earth.gif");
                break;
            case Element.ICE:
                result.push("assets/images/ice.gif");
                break;
        }
        return result;
    }

    differenceAP(set: EquipmentSet, compareWith: EquipmentSet): number {
        return totalAP(set, this.schmiedekunst) - totalAP(compareWith, this.schmiedekunst);
    }

    differenceVP(set: EquipmentSet, compareWith: EquipmentSet): number {
        return totalVP(set, this.schmiedekunst) - totalVP(compareWith, this.schmiedekunst);
    }

    differenceHP(set: EquipmentSet, compareWith: EquipmentSet): number {
        return totalHP(set, this.schmiedekunst) - totalHP(compareWith, this.schmiedekunst);
    }

    differenceMP(set: EquipmentSet, compareWith: EquipmentSet): number {
        return totalMP(set, this.schmiedekunst) - totalMP(compareWith, this.schmiedekunst);
    }
}

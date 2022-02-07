import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EquipmentSet } from '../../shared/_types/equipment-set';
import { Cache } from '../_types/cache';
import { cached } from '../_util/operators';
import { environment } from '../../environments/environment';
import { ALL_ACCESSORIES, ALL_ARMOUR, ALL_HELMETS, ALL_SHIELDS, ALL_WEAPONS } from '../../shared/_types/equipment';
import { Element } from '../../shared/_types/element';

import { CacheService } from './cache.service';
import { WebSocketService } from './web-socket.service';

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {
    private equipmentCache: Cache<EquipmentSet>;

    constructor(private websocketService: WebSocketService, cacheService: CacheService) {
        this.equipmentCache = cacheService.get<EquipmentSet>('equipmentCache');
    }

    private static getCacheKey(...objects: Array<unknown>): string {
        return objects.join(':');
    }

    getEquipment(
        unitName: string,
        carryWeight: number,
        element: Element,
        ranged: boolean,
        waffenschmiede: number,
        rangedRequired: boolean,
        rangedForbidden: boolean,
        apWeight: number,
        vpWeight: number,
        hpWeight: number,
        mpWeight: number,
        elementAttack?: Element,
        elementDefense?: Element
    ): Observable<EquipmentSet> {
        if (!environment.production) {
            // mock backend in dev-mode
            return of({
                weapon: ALL_WEAPONS[getRandomInt(ALL_WEAPONS.length - 1)],
                shield: ALL_SHIELDS[getRandomInt(ALL_SHIELDS.length - 1)],
                armour: ALL_ARMOUR[getRandomInt(ALL_ARMOUR.length - 1)],
                helmet: ALL_HELMETS[getRandomInt(ALL_HELMETS.length - 1)],
                accessory: ALL_ACCESSORIES[getRandomInt(ALL_ACCESSORIES.length - 1)],
            });
        }
        const cacheKey = EquipmentService.getCacheKey(
            carryWeight,
            element,
            ranged,
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

        return this.websocketService
            .sendMessage<EquipmentSet>({
                unitCarryWeight: carryWeight,
                unitElement: element,
                unitRanged: ranged,
                waffenschmiede,
                rangedRequired,
                rangedForbidden,
                elementAttack,
                elementDefense,
                apWeight,
                vpWeight,
                hpWeight,
                mpWeight,
            })
            .pipe(cached(this.equipmentCache, cacheKey));
    }
}

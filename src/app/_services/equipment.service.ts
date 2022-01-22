import { Injectable } from '@angular/core';
import { Unit } from '../_types/unit';
import { Observable, of } from 'rxjs';
import { EquipmentSet } from '../../shared/_types/equipment-set';
import { HttpClient } from '@angular/common/http';
import { Cache } from '../_types/cache';
import { CacheService } from './cache.service';
import { cached } from '../_util/operators';
import { toHttpParams } from '../_util/http';
import { environment } from '../../environments/environment';
import { ALL_ACCESSORIES, ALL_ARMOUR, ALL_HELMETS, ALL_SHIELDS, ALL_WEAPONS } from '../../shared/_types/equipment';
import { Element } from '../../shared/_types/element';

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {
    private equipmentCache: Cache<EquipmentSet>;

    constructor(private http: HttpClient, cacheService: CacheService) {
        this.equipmentCache = cacheService.get<EquipmentSet>('equipmentCache');
    }

    getEquipment(
        unit: Unit,
        waffenschmiede: number,
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
        const cacheKey = `${unit.name}:${waffenschmiede}:${apWeight}:${vpWeight}:${hpWeight}:${mpWeight}:${elementAttack}:${elementDefense}`;
        const params = toHttpParams({
            carryWeight: unit.carryWeight,
            element: unit.element,
            ranged: unit.ranged,
            waffenschmiede,
            elementAttack,
            elementDefense,
            apWeight,
            vpWeight,
            hpWeight,
            mpWeight,
        });
        return this.http.get<EquipmentSet>('/equipment', { params }).pipe(cached(this.equipmentCache, cacheKey));
    }
}

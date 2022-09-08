import { Injectable } from '@angular/core';

import { Cache } from '../_types/cache';

const TTL = 3 * 60 * 1000;

@Injectable({
    providedIn: 'root',
})
export class CacheService {
    private caches: Map<string, Cache<unknown>> = new Map<string, Cache<unknown>>();

    clear(): void {
        this.caches.forEach((cache: Cache<unknown>) => cache.clear());
    }

    get<T>(name: string, ttl: number = TTL): Cache<T> {
        const cache = this.caches.get(name);
        if (cache) return cache as Cache<T>;

        const newCache = new Cache<T>(ttl);
        this.caches.set(name, newCache);
        return newCache;
    }
}

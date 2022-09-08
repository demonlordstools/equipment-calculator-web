import { MonoTypeOperatorFunction, Observable, of, tap } from 'rxjs';

import { Cache } from '../_types/cache';

export function cached<T>(cache: Cache<T>, cacheKey: string): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => {
        const cacheEntry = cache.get(cacheKey);
        return cacheEntry ? of(cacheEntry) : source.pipe(tap((result) => cache.put(cacheKey, result)));
    };
}

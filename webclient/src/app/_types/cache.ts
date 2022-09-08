interface CacheEntry<T> {
    expiryDate: number;
    value: T;
}

export class Cache<T> {
    private map: Map<string, CacheEntry<T>>;

    constructor(private ttl: number) {
        this.map = new Map<string, CacheEntry<T>>();
    }

    get(key: string): T | undefined {
        const cacheEntry = this.map.get(key);
        if (!cacheEntry) return;

        const now = new Date();
        if (now.getTime() > cacheEntry.expiryDate) {
            this.remove(key);
            return;
        }
        return cacheEntry.value;
    }

    put(key: string, value: T): void {
        const now = new Date();
        const expiryDate = now.getTime() + this.ttl;
        this.map.set(key, { expiryDate, value });
    }

    remove(key: string): boolean {
        return this.map.delete(key);
    }

    clear(): void {
        this.map.clear();
    }

    size(): number {
        return this.map.size;
    }
}

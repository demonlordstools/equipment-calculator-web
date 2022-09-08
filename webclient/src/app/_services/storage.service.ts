import { Injectable } from '@angular/core';

const WAFFENSCHMIEDE_KEY = 'WAFFENSCHMIEDE';
const SCHMIEDEKUNST_KEY = 'SCHMIEDEKUNST';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    saveWaffenschmiede(waffenschmiede: number): void {
        localStorage.setItem(WAFFENSCHMIEDE_KEY, waffenschmiede + '');
    }

    saveSchmiedekunst(schmiedekunst: number): void {
        localStorage.setItem(SCHMIEDEKUNST_KEY, schmiedekunst + '');
    }

    getWaffenschmiede(): number {
        const savedWS = localStorage.getItem(WAFFENSCHMIEDE_KEY);
        return savedWS ? Number.parseInt(savedWS) : 0;
    }

    getSchmiedekunst(): number {
        const savedSK = localStorage.getItem(SCHMIEDEKUNST_KEY);
        return savedSK ? Number.parseInt(savedSK) : 0;
    }
}

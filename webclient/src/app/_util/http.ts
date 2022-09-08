import { HttpParams } from '@angular/common/http';

export function toHttpParams(data: Record<string, unknown>): HttpParams {
    const fromObject: Record<string, string> = {};
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) fromObject[key] = `${value}`;
    });
    return new HttpParams({ fromObject });
}

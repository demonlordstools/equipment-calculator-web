import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, Subject, tap } from 'rxjs';

import { WEBSOCKET_ERROR_CODE } from '../../shared/_types/error';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    wsEndpoint = `ws://${location.host}`;

    public sendMessage<T>(message: unknown): Observable<T> {
        return of(undefined).pipe(
            mergeMap(() => {
                const webSocket = new WebSocket(this.wsEndpoint);
                const result$ = new Subject<T>();

                webSocket.onopen = () => webSocket.send(JSON.stringify(message));
                webSocket.onmessage = (event) => result$.next(JSON.parse(event.data) as T);
                webSocket.onclose = (event) => {
                    if (event.code === WEBSOCKET_ERROR_CODE) {
                        result$.error(JSON.parse(event.reason));
                    }
                };

                return result$.pipe(
                    // we are only interested in the first answer, don't hold the connection open
                    tap(() => webSocket.close())
                );
            })
        );
    }
}

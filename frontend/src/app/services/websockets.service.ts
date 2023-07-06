import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { BaseProviderService } from './base-provider.service';
import { BaseProvider } from '../models';

@Injectable({ providedIn: 'root' })
export class WebsocketsService {
    private socket: WebSocket;
    constructor(private baseProviderService: BaseProviderService) {
        const protocol = window.location.protocol.replace('http', 'ws');
        const host = window.location.host;
        this.baseProviderService.getCurrentProvider().subscribe((p: BaseProvider) => this.socket = new WebSocket(`${protocol}//${host}/${p.url}ws`));
    }

    connect(): Observable<Event | MessageEvent> {
        return new Observable((observer: Subscriber<Event>) => {
            this.socket.onopen = (event: Event) => observer.next(event);
            this.socket.onmessage = (event: MessageEvent<string>) => observer.next(event);
            this.socket.onerror = (error: Event) => observer.error(error);
            this.socket.onclose = () => observer.complete();

            return () => this.socket.close();
        });
    }

    send(message: string): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ event: 'test', data: message }));
        }
    }
}

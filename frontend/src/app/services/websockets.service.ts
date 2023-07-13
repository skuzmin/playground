import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { BaseProviderService } from './base-provider.service';
import { BaseProvider } from '../models';

@Injectable({ providedIn: 'root' })
export class WebsocketsService {
    private socket: WebSocket;
    private url: string;
    constructor(private baseProviderService: BaseProviderService) {
        const protocol = window.location.protocol.replace('http', 'ws');
        const host = window.location.host;
        this.baseProviderService.getCurrentProvider().subscribe((p: BaseProvider) => {
            if (this.socket && this.socket.readyState === this.socket.OPEN) {
                this.socket.close();
            }
            this.url = `${protocol}//${host}/${p.url}ws`;
        });
    }

    connect(): Observable<Event | MessageEvent> {
        this.socket = new WebSocket(this.url);
        return new Observable((observer: Subscriber<Event>) => {
            this.socket.onopen = (event: Event) => observer.next(event);
            this.socket.onmessage = (event: MessageEvent<string>) => observer.next(event);
            this.socket.onerror = (error: Event) => observer.error(error);
            this.socket.onclose = (event: CloseEvent) => {
                observer.next(event);
                observer.complete();
            };

            return () => this.socket.close();
        });
    }

    send(message: string): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ event: 'test', data: message }));
        }
    }
}

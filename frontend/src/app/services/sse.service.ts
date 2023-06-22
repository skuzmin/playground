import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

import { BaseProviderService } from './base-provider.service';
import { BaseProvider } from '../models';

@Injectable({ providedIn: 'root' })
export class SseService {
    private url: string;
    private eventSource: EventSource;
    private isConnected$: BehaviorSubject<boolean>;
    constructor(private zone: NgZone, private baseProviderService: BaseProviderService) {
        this.baseProviderService.getCurrentProvider().subscribe((p: BaseProvider) => this.url = `${p.url}/sse`);
        this.isConnected$ = new BehaviorSubject(false);
    }

    getServerSentEvent(): Observable<MessageEvent> {
        return new Observable((observer: Subscriber<MessageEvent>) => {
            this.eventSource = new EventSource(this.url);
            this.eventSource.onmessage = (event: MessageEvent) => this.zone.run(() => observer.next(event));
            this.eventSource.onerror = (error: Event) => this.zone.run(() => observer.error(error));
            this.isConnected$.next(true);
        });
    }

    close(): void {
        this.eventSource.close();
        this.isConnected$.next(false);
    }

    getStatus(): Observable<boolean> {
        return this.isConnected$;
    }
}
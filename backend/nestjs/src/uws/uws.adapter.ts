import { EventEmitter } from 'node:events';
import { WebSocketAdapter } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import * as UWS from 'uWebSockets.js';

type UWSEmitterSocket = UWS.WebSocket<unknown> & { emitter: EventEmitter };

export class UwsAdapter implements WebSocketAdapter {
    private app: UWS.TemplatedApp;
    private listenSocket: UWS.us_listen_socket;
    private port: number;
    constructor(port: number) {
        this.port = port;
        this.app = UWS.App();
    }

    create(): UWS.TemplatedApp {
        return this.app.listen(this.port, (token: UWS.us_listen_socket) => {
            if (token) {
                this.listenSocket = token;
            } else {
                console.log('UWS START ERROR!');
            }
        }).any('/*', (res: UWS.HttpResponse) => {
            res.end('Nothing to see here!');
        });
    }

    bindClientConnect(server: UWS.TemplatedApp, callback: Function): void {
        server.ws('/*', {
            open: (ws: UWSEmitterSocket) => {
                ws.emitter = new EventEmitter();
                callback(ws);
            },
            message: (ws: UWSEmitterSocket, message: ArrayBuffer, isBinary: boolean) => {
                ws.emitter.emit('message', { message, isBinary });
            }
        });
    }

    bindMessageHandlers(ws: UWSEmitterSocket, handlers: Array<MessageMappingProperties>, process: (data: any) => Observable<any>): void {
        const handlersMap: Record<string, Function> = {};
        handlers.forEach((h: MessageMappingProperties) => handlersMap[h.message] = h.callback);

        fromEvent(ws.emitter, 'message')
            .pipe(
                mergeMap((data: { message: ArrayBuffer, isBinary: boolean }) => {
                    const buffer = Buffer.from(data.message).toString('utf-8');
                    const message = JSON.parse(buffer);
                    const messageHandlerCallback = handlersMap[message.event];
                    return !messageHandlerCallback ? EMPTY : process(messageHandlerCallback(message.data));
                }),
                filter((result: any) => result),
            )
            .subscribe((response: any) => ws.send(JSON.stringify(response)));
    }

    close(): void {
        UWS.us_listen_socket_close(this.listenSocket);
        this.app = null;
    }
}

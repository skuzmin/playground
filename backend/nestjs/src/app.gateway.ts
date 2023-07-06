import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway
} from '@nestjs/websockets';
import * as UWS from 'uWebSockets.js';

@WebSocketGateway(8080)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    afterInit(server: UWS.TemplatedApp): void {
        setInterval(() => {
            server.publish('testdata/colors', Math.floor(Math.random() * 16777215).toString(16));
            server.publish('testdata/numbers', Math.floor(Math.random() * 1000).toString());
        }, 2000);
    }

    handleConnection(_client: any): void { }

    handleDisconnect(_client: any): void { }

    @SubscribeMessage('test')
    handleTest(client: UWS.WebSocket<unknown>, data: string): void {
        switch (data) {
            case 'color': {
                client.subscribe('testdata/colors');
                break;
            }
            case 'number': {
                client.subscribe('testdata/numbers');
                break;
            }
            case 'cancel': {
                client.getTopics().forEach((topic: string) => client.unsubscribe(topic));
            }
        }
    }
}

import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'ws';

@WebSocketGateway(8080)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;

    handleConnection(client: any): void {
        console.log('Connect: ', client);
    }

    handleDisconnect(client: any): void {
        console.log('Disconnect ', client);
    }
}

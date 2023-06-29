import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'ws';

@WebSocketGateway(8080)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private clients: Set<any>;
    @WebSocketServer() private server: Server;

    afterInit(): void {
        this.clients = new Set();
    }

    handleConnection(client: any): void {
        this.clients.add(client);
    }

    handleDisconnect(client: any): void {
        this.clients.delete(client);
    }

    @SubscribeMessage('text')
    handleText(_client: any, data: string) {
        const payload = JSON.stringify({ time: new Date().toTimeString().split(' ')[0], text: data });
        this.clients.forEach((c: any) => c.send(payload));
    }
}

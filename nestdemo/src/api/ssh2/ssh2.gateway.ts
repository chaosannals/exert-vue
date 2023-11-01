import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';

@WebSocketGateway({
    // namespace: '/ssh2',
    allowEIO3: true,
    cors: {
        origin: 'http://localhost:1420',
        credentials: true,
    }
})
export class Ssh2Gateway {
    @SubscribeMessage("ssh2")
    onMessage(@MessageBody() data: any) : WsResponse<any> {
        console.log('ssh2', 'onMessage', data);
        return { event: 'ssh2', data };
    }
}
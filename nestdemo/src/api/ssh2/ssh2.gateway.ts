import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket } from 'net';
import { Client, ClientChannel, ConnectConfig } from 'ssh2';
import { Ssh2Service } from './ssh2.service';

class Ssh2Client {
    constructor(
        private client: Client,
        private shell: ClientChannel,
    ) {}

    destroy() {
        this.shell.end();
        this.shell.close();
        this.shell.destroy();
        this.client.end();
        this.client.destroy();
    }

    async call(command: string) {
        return new Promise((resolve, reject) => {
            this.shell.write(`${command}\n`, e => {
                if (e) {
                    reject(e)
                } else {
                    resolve(null);
                }
            });
        });
    }

    async end() {
        await this.call('exit');
        this.shell.end();
    }
}

@WebSocketGateway({
    namespace: 'ssh2',
    allowEIO3: true,
    cors: {
        origin: 'http://localhost:1420',
        credentials: true,
    }
})
export class Ssh2Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {
    private clients: Map<string, Ssh2Client>;

    constructor(
        private ssh2Service: Ssh2Service,
    ) {
        console.log('Ssh2Gateway', 'constructor');
        this.clients = new Map<string, Ssh2Client>();
    }
    
    afterInit(server: any) {
        console.log('Ssh2Gateway', 'onInit');
    }
    
    handleConnection(client: any, ...args: any[]) {
        console.log('Ssh2Gateway', 'onConnect', client.id , args);
    }

    handleDisconnect(client: any) {
        console.log('Ssh2Gateway', 'onDisconnect', client.id);
        if (this.clients.has(client.id)) {
            const ssh = this.clients.get(client.id);
            ssh.destroy();
            this.clients.delete(client.id);
            console.log('关闭 ssh2', client.id);
        }
    }

    @SubscribeMessage("onAuth")
    async onAuth(
        @ConnectedSocket() client: any,
        @MessageBody() data: ConnectConfig,
    ) : Promise<WsResponse<any>> {
        console.log('ssh2', 'onAuth');

        const ssh = await this.ssh2Service.connect(data);
        const shell = await this.ssh2Service.startShell(ssh);
        shell.on('data', d => {
            client.emit('onStdoutResult', { message: d.toString('utf8') });
        }).stderr.on('data', d => {
            client.emit('onStderrResult', { message: d.toString('utf8') });
        });
        this.clients.set(client.id, new Ssh2Client(ssh, shell));

        return {
            event: 'onAuthResult',
            data: {
                id: client.id
            },
        };
    }

    @SubscribeMessage("onExec")
    onExec(
        @ConnectedSocket() client: any,
        @MessageBody() data: string,
    ) : WsResponse<any> {
        if (this.clients.has(client.id)) {
            const ssh2 = this.clients.get(client.id);
            ssh2.call(data);
        } else {
            return { event: 'onStderrResult', data: { message: `没有连接 ssh: ${client.id}`} };
        }
    }
}
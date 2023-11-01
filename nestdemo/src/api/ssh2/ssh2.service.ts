import { Injectable } from '@nestjs/common';
import { Client, ConnectConfig } from 'ssh2';

export class Ssh2ExecOneResult {
    stdout: string;
    stderr: string;
    code: any;
    signal: any;
}

@Injectable()
export class Ssh2Service {

    constructor() {


    }

    async connect(config: ConnectConfig): Promise<Client> {
        return new Promise((resolve, reject) => {
            const client = new Client();
            client.on('ready', () => {
                resolve(client);
            }).on('error', (e) => {
                reject(e);
            }).connect(config);
        });
    }

    async execOne(client: Client, command: string): Promise<Ssh2ExecOneResult> {
        return new Promise((resolve, reject) => {
            client.exec(command, (e, stream) => {
                console.log('execOne', 'start');
                if (e) {
                    reject(e);
                } else {
                    const result = new Ssh2ExecOneResult();
                    result.stdout = "";
                    result.stderr = "";
                    stream.on('close', (code, signal) => {
                        result.code = code;
                        result.signal = signal;
                        resolve(result);
                        console.log('execOne', 'close');
                    }).on('data', (data) => {
                        result.stdout += data.toString('utf8');
                        console.log('execOne', 'stdout', data.toString('utf8'));
                    }).stderr.on('data', (data) => {
                        result.stderr += data.toString('utf8');
                        console.log('execOne', 'stderr', data.toString('utf8'));
                    });
                }
            })
        });
    }
}

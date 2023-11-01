import { Injectable } from '@nestjs/common';
import { Client, ClientChannel, ConnectConfig } from 'ssh2';

export class Ssh2ExecOneResult {
    stdout: string;
    stderr: string;
    code: any;
    signal: any;
}

export class Ssh2Shell {
    stdout: string;
    stderr: string;
    stream: ClientChannel;
    result: Promise<unknown>;

    async call(command: string) {
        return new Promise((resolve, reject) => {
            this.stream.write(`${command}\n`, e => {
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
        this.stream.end();
    }

    async wait() {
        await this.result;
    }
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

    async execOne(config: ConnectConfig, command: string): Promise<Ssh2ExecOneResult> {
        const client = await this.connect(config);
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
                        client.end();
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

    async openShell(config: ConnectConfig) : Promise<Ssh2Shell> {
        const client = await this.connect(config);
        return new Promise((resolve, reject) => {
            console.log('openShell', 'start');
            client.shell((e, stream) => {
                if (e) {
                    reject(e);
                } else {
                    const result = new Ssh2Shell();
                    result.stdout = "";
                    result.stderr = "";
                    result.stream = stream;
                    result.result = new Promise((resolve2) => {
                        stream.on('close', () => {
                            console.log('openShell', 'close');
                            client.end();
                            resolve2(null);
                        }).on('data', (data) => {
                            console.log('openShell', 'stdout',  data.toString('utf8'));
                            result.stdout += data.toString('utf8');
                        }).stderr.on('data', (data) => {
                            console.log('openShell', 'stderr',  data.toString('utf8'));
                            result.stderr += data.toString('utf8');
                        });
                        resolve(result);
                    });
                }
            });
        });
    }
}

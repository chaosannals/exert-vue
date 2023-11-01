export class Ssh2DoSomeDto {
    host: string;
    port: number;
    username: string;
    privateKey: string;
    command?: string;
    commands?: string[];
}
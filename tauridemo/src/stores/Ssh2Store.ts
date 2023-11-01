import { defineStore } from "pinia";
import { reactive } from "vue";

export interface Ssh2ConfigInfo {
    host: string;
    port?: string;
    username: string;
    privateKey?: string;
    command?: string;
    commands?: string[];
}

export const useSsh2Store = defineStore('ssh2', () => {
    const config = reactive({
        host: '127.0.0.1',
        port: '22',
        username: 'root',
        command: 'pwd',
        commands: [],
    } as Ssh2ConfigInfo);
    return {
        config
    };
}, {
    persist: true,
});
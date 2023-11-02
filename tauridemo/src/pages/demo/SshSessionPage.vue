<template>
    <div class="ssh-session-page">
        <p>{{ here }}</p>
        <form class="ssh-form" @submit.prevent="onSubmit">
            <div class="ssh-input">
                <label>域名</label>
                <input v-model="store.config.host" />
            </div>
            <div class="ssh-input">
                <label>端口</label>
                <input v-model="store.config.port" />
            </div>
            <div class="ssh-input">
                <label>用户</label>
                <input v-model="store.config.username" />
            </div>
            <div class="ssh-textarea">
                <label>密钥</label>
                <input type="file" @input="onLoadPriKey">
                <textarea v-model="store.config.privateKey"></textarea>
            </div>
            <div class="ssh-textarea">
                <label>命令</label>
                <textarea v-model="store.config.command"></textarea>
            </div>
            <div class="ssh-row">
                <button type="button" @click="onAuth">连接</button>
                <button type="submit">执行</button>
                <button type="button" @click="onExit">断开</button>
            </div>
            <div class="ssh-textarea">
                <label>stdout</label>
                <textarea v-model="data.stdout"></textarea>
            </div>
            <div class="ssh-textarea">
                <label>stderr</label>
                <textarea v-model="data.stderr"></textarea>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { io } from 'socket.io-client';
import { useSsh2Store } from '../../stores/Ssh2Store';
import { readAsArrayBuffer } from '../../utils/io';
import { isEmpty } from 'lodash';

const here = computed(() => {
    return window.location.href;
});

const store = useSsh2Store();

const data = reactive({
    id: "",
    stdout: "",
    stderr: "",
});

const socket = io('http://127.0.0.1:3001/ssh2');

socket.on('connect', () => {
    console.log('ssh2', 'connect', socket.connected);
});

socket.on('onAuthResult', (result) => {
    console.log('ssh2', 'onAuthResult', result);
    data.id = result.id;
});

socket.on('onStdoutResult', (d) => {
    console.log('onStdoutResult', d);
    data.stdout += d.message;
});
socket.on('onStderrResult', (d) => {
    console.log('onStderrResult', d);
    data.stderr += d.message;
});

const onAuth = () => {
    console.log('onAuth', data.id);
    if (!isEmpty(data.id)) {
        data.stderr = '已经连接';
    } else {
        socket.emit('onAuth', store.config);
    }
};

const onExit = () => {
    if (!isEmpty(data.id)) {
        socket.close();
    } else {
        data.stderr = '未连接';
    }
}

const onSubmit = async () => {
    console.log('onExec', data.id);
    if (!isEmpty(data.id)) {
        socket.emit('onExec', store.config.command);
    } else {
        data.stderr = '还未连接';
    }
}

onBeforeMount(() => {
    console.log('ssh2', socket.connected);
});

onBeforeRouteLeave(() => {
    socket.emit('disconnect');
});

const onLoadPriKey = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files![0];
    const buffer = await readAsArrayBuffer(file);
    //@ts-ignore
    store.config.privateKey = Utf8.stringify(WordArray.create(buffer));
};
</script>

<style scoped lang="scss">
.ssh-session-page {
    position: relative;
}
</style>
<template>
    <div class="ssh-session-page">
        <h1>SSH2</h1>
        <p>{{ here }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { io } from'socket.io-client';

const here = computed(() => {
    return window.location.href;
});

const socket = io('http://127.0.0.1:3001');
socket.on('connect', () => {
    console.log('ssh2', 'connect', socket.connected);
});

socket.on('ssh2', (data) => {
    console.log('ssh2', 'message', data);
});

onBeforeMount(() => {
    console.log('ssh2', socket.connected);
    socket.emit('ssh2', { data: 'data' });
});

onBeforeRouteLeave(() => {
    socket.emit('disconnect');
});
</script>

<style scoped lang="scss">
.ssh-session-page {
    position: relative;
}
</style>
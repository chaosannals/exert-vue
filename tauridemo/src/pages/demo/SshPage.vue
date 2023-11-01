<template>
    <div class="ssh-page">
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
                <button type="submit">执行</button>
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
import { readAsArrayBuffer } from '../../utils/io';
import Utf8 from 'crypto-js/enc-utf8';
import WordArray from 'crypto-js/lib-typedarrays';
import { useSsh2Store } from '../../stores/Ssh2Store';
import { apiPost } from '../../utils/http';
import { reactive } from 'vue';

const data = reactive({
    stdout: "",
    stderr: "",
});

const store = useSsh2Store();

const onLoadPriKey = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files![0];
    const buffer = await readAsArrayBuffer(file);
    //@ts-ignore
    store.config.privateKey = Utf8.stringify(WordArray.create(buffer));
};

const onSubmit = async () => {
    const response = await apiPost<{
        stdout: string;
        stderr: string;
    }>("/ssh2/dosome", store.config);
    console.log('response', response.data);
    data.stdout = response.data.stdout;
    data.stderr = response.data.stderr;
}

</script>

<style scoped lang="scss">
.ssh-page {
    display: flex;
    position: relative;
}

.ssh-form {
    display: flex;
    flex-direction: column;
}

.ssh-input {
}

.ssh-row {
    button {
        width: 100%;
    }
}

.ssh-input, .ssh-textarea, .ssh-row {
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-shrink: 1;
    label {
        min-width: 4em;
    }
}
</style>
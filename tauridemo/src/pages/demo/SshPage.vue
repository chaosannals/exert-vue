<template>
    <div class="ssh-page">
        <form class="ssh-form">
            <div class="ssh-input">
                <label>域名</label>
                <input v-model="data.host"/>
            </div>
            <div class="ssh-input">
                <label>端口</label>
                <input v-model="data.port"/>
            </div>
            <div class="ssh-input">
                <label>用户</label>
                <input v-model="data.username"/>
            </div>
            <div class="ssh-textarea">
                <label>密钥</label>
                <input type="file" @input="onLoadPriKey">
                <textarea v-model="data.privateKey"></textarea>
            </div>
            <div class="ssh-textarea">
                <label>命令</label>
                <textarea v-model="data.command"></textarea>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { readAsArrayBuffer } from '../../utils/io';
import Utf8 from 'crypto-js/enc-utf8';
import WordArray from 'crypto-js/lib-typedarrays';

const data = reactive({
    host: "",
    port: "22",
    username: 'root',
    privateKey: "",
    command: "pwd",
});

const onLoadPriKey = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files![0];
    const buffer = await readAsArrayBuffer(file);
    //@ts-ignore
    data.privateKey = Utf8.stringify(WordArray.create(buffer));
};

</script>

<style scoped lang="scss">
.ssh-page {
    display: flex;
    position: relative;
}

.ssh-form {

}
</style>
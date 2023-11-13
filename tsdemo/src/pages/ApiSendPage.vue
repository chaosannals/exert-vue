<template>
    <div class="api-send-page">
        <input v-model="data.apiPath" />
        <textarea v-model="data.apiData" rows="4"></textarea>
        <textarea v-model="data.apiResult" rows="14"></textarea>
        <button @click="onSendPost">发送 POST</button>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { http } from '../utils/http';

const data = reactive({
    apiPath: '/user/find',
    apiData: JSON.stringify({
        skip: 0,
        take: 100,
    }),
    apiResult: '',
});

const onSendPost = async () => {
    const response = await http.post(data.apiPath, JSON.parse(data.apiData));
    console.log(response);
    data.apiResult = JSON.stringify(response.data);
};
</script>

<style scoped lang="scss"></style>
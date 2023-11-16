<template>
    <div class="login-page">
        <ElButton @click="onSubmit">登录</ElButton>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/AuthStore';

const auth = useAuthStore();
const router = useRouter();

const onSubmit = () => {
    auth.token = '123';
    auth.permissions.push('demo');
    router.push('/');
};
</script>

<style scoped lang="scss">
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>

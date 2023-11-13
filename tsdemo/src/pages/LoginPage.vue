<template>
    <div class="login-page">
        <form class="login-form" @submit="onSubmit">
            <div class="login-input">
                <label>用户</label>
                <input v-model="data.username" />
            </div>
            <div class="login-input">
                <label>密码</label>
                <input v-model="data.password" />
            </div>
            <div class="login-row">
                <button type="submit">登录</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { http } from '../utils/http';
import { useCommonStore } from '../stores/common';
import { useRouter } from 'vue-router';

const data = reactive({
    username: 'admin',
    password: '123456',
});

const common = useCommonStore();
const router = useRouter();

const onSubmit = async (e: Event) => {
    e.preventDefault();
    const response = await http.post('/auth/login', {
        username: data.username,
        password: data.password,
    });
    console.log(response);
    if (response.status >= 200 && response.status <= 299) {
        common.token = response.data['access_token'];
        router.push('/');
    }
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

.login-form {
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    border: 1px solid #d4d4d4;
    padding: .4em;
    flex-shrink: 1;
}

.login-input {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin: .4em 0;

    &>label {
        min-width: 4em;
        text-align: left;
        text-indent: 1em;
    }

    &>input {
        flex-grow: 1;
        outline: none;
        border: 1px solid #f4f4f4;
        border-radius: .4em;
        padding: .4em;
        margin-left: .4em;
    }
}

.login-row {
    display: flex;

    &>button {
        flex-grow: 1;
        padding: .4em;
        border: none;
        color: white;
        background-color: #49f;
    }
}
</style>
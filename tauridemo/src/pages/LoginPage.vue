<template>
    <div class="login-page">
        <div class="header">

        </div>
        <div class="content">
            <form class="login-form" @submit="onSubmit">
                <div class="login-input">
                    <label>用户</label>
                    <input v-model="data.username" type="text" />
                </div>
                <div class="login-input">
                    <label>密码</label>
                    <input v-model="data.password" type="password" />
                </div>
                <div class="login-row">
                    <button type="submit">登录</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { apiPost } from '../utils/http';
import { useUserStore } from '../stores/UserStore';
import { useRouter } from 'vue-router';
import pinia from '../store';

const user = useUserStore(pinia);
const router = useRouter();

const data = reactive({
    username: "admin",
    password: "123456",
});

const onSubmit = async (event: Event) => {
    event.preventDefault();
    const response = await apiPost<any>(`/auth/login`, {
        username: data.username,
        password: data.password,
    });
    console.log(response);
    if (response.status >= 200 && response.status <= 299) {
        user.saveToken(response.data.access_token as string);
        router.push('/index');
    }
};

</script>

<style scoped lang="scss">
.login-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .header {
        width: 100%;
        height: 10vh;
    }

    .content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex-grow: 1;
        background-color: #4499ff;
    }
}

.login-form {
    overflow: hidden;
    align-items: normal;
    flex-shrink: 1;
    padding: 1em;
    background-color: white;

    &>.login-input {
        display: flex;
        margin: .4em 0;

        &>label {
            min-width: 4em;
        }

        &>input {
            outline: none;
        }
    }

    &>.login-row {
        display: flex;

        &>button {
            flex-grow: 1;
        }
    }
}
</style>
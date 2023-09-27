<template>
    <div class="login-page">
        <form class="login-form" @submit="onSubmit">
            <div class="login-input">
                <input v-model="username" name="username" type="text" placeholder="请输入"/>
            </div>
            <div class="login-input">
                <input v-model="password" name="password" type="password" placeholder="请输入"/>
            </div>
            <div class="login-button-group">
                <button type="button" @click="onClear">清空</button>
                <button type="submit">登录</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        username: "",
        password: "",
    }),
    methods: {
        onClear() {
            this.username="";
            this.password="";
        },

        onSubmit(e) {
            // 一旦阻止默认行为 edge 就不会弹出记住密码的提示框，不过可以手动点。
            e.preventDefault();
            console.log('submit', e);
        }
    },
};
</script>
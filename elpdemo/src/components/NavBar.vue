<template>
    <ElMenu class="nav-bar" mode="vertical" :default-active="route.path" :default-openeds="app.navbar.opends" @open="onOpen"
        @close="onClose" :router="true" :collapse="false" background-color="transparent">
        <ElMenuItem index="/">首页</ElMenuItem>
        <ElSubMenu v-for="m in MENU" :index="m.index" :title="m.title">
            <template #title>
                <span>{{ m.title }}</span>
            </template>
            <ElMenuItem v-for="c in m.children" :index="c.index" :title="c.title">{{ c.title }}</ElMenuItem>
        </ElSubMenu>
    </ElMenu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAppStore } from '../stores/AppStore';

const MENU = [
    {
        title: '组件示例',
        index: '/demo/list',
        children: [
            {
                title: '示例列表',
                index: '/demo/list',
            },
            {
                title: 'V2 虚表示例',
                index: '/demo/table-v-2',
            },
            {
                title: 'VXE 虚表示例',
                index: '/demo/vxe-table',
            },
        ],
    },
    {
        title: '其他示例',
        index: '/other/list',
        children: [
            {
                title: 'gif.js 示例',
                index: '/other/gif-js-demo',
            },
            {
                title: 'image-in-browser 示例',
                index: '/other/image-in-browser-demo',
            },
        ],
    },
    {
        title: '玩意示例',
        index: '/toy/list',
        children: [
            {
                title: '倒计时示例',
                index: '/toy/countdown',
            },
        ],
    },
    {
        title: '特殊页面',
        index: '/',
        children: [
            {
                title: '登录页',
                index: '/login',
            },
        ],
    },
];

const app = useAppStore();
const route = useRoute();

const onOpen = (index: string) => {
    const i = app.navbar.opends.indexOf(index);
    if (i == -1 && index != '/') {
        app.navbar.opends.push(index);
    }
};
const onClose = (index: string) => {
    const i = app.navbar.opends.indexOf(index);
    if (i > -1 && index != '/') {
        app.navbar.opends.splice(i, 1);
    }
};
</script>

<style scoped lang="scss">
.nav-bar {
    display: flex;
    flex-direction: column;
    width: 10em;
    margin: 2em 0;
    overflow: hidden;
}
</style>
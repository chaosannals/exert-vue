import {
    RouteRecordRaw,
    createRouter,
    createWebHistory,
} from "vue-router";
import { isEmpty, kebabCase } from 'lodash';
import { useAuthStore } from "./stores/AuthStore";
import * as IndexMeta from './pages/IndexPage';
import { useAppStore } from "./stores/AppStore";
import EmbedRouteLayout from './layouts/EmbedRouteLayout.vue';

function routePages(): RouteRecordRaw[] {
    const result: RouteRecordRaw[] = [
        {
            path: '/',
            component: () => import("./pages/IndexPage.vue"),
            meta: IndexMeta,
        },
    ];
    const metas = import.meta.glob('./pages/**/*Page.ts', { eager: true });
    const pages = import.meta.glob('./pages/**/*Page.vue');
    for (const p of Object.keys(pages)) {
        const m = p.match(/.\/pages\/(.*)Page\.vue/);
        if (m && m[1] != 'Login') {
            const prefix = p.substring(0, p.length - 4);
            const mp = `${prefix}.ts`;
            const n = m[1]
                .split('/')
                .map(i => kebabCase(i))
                .join('/');
            result.push({
                path: `/${n}`,
                alias: `/${n}.html`,
                component: pages[p],
                meta: metas[mp] as any,
            });
        }
    }
    console.log('routes', result);
    return result;
}

export const routes = routePages();

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: EmbedRouteLayout,
        children: routes,
    }, {
        path: '/login',
        alias: '/login.html',
        component: () => import('./pages/LoginPage.vue'),
    }],
});

router.beforeEach(async (to) => {
    const app = useAppStore();
    const auth = useAuthStore();

    // 登录状态
    if (to.path.startsWith('/login')) {
        if (!isEmpty(auth.token)) {
            return { path: '/' };
        }
    } else {
        if (isEmpty(auth.token)) {
            return { path: '/login' };
        }
    }

    // 标题
    if (to.meta?.title) {
        document.title = to.meta.title as string;
    }

    // 标签
    if (to.meta?.tabMode == 'single') {
        const tab = app.tabbar.find(tab => tab.fullPath == to.fullPath);
        if (tab) {

        } else {
            app.tabbar.push({
                fullPath: to.fullPath,
                title: to.meta?.title,
                closable: to.meta?.tabClosable ?? false,
            });
        }
    }
});

export default router;
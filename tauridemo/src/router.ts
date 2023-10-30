import {
    createRouter,
    createWebHistory,
} from "vue-router";
import { isEmpty, kebabCase } from 'lodash';
import { useUserStore } from "./stores/UserStore";

function routePages() {
    const result = [
        {
            path: '/',
            component: () => import("./pages/EnterPage.vue"),
        }
    ];
    const pages = import.meta.glob('./pages/**/*Page.vue');
    for (const p of Object.keys(pages)) {
        const m = p.match(/.\/pages\/(.*)Page\.vue/);
        if (m) {
            const n = m[1]
                .split('/')
                .map(i => kebabCase(i))
                .join('/');
            result.push({
                path: `/${n}`,
                alias: `/${n}.html`, // 调试服务器别名带后缀不可用，编译后是正常的。
                // @ts-ignore
                component: pages[p],
            });
        }
    }
    console.log('routes', result);
    return result;
}

export const routes = routePages();

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach(async (to, from) => {
    const user = useUserStore();
    if (to.path != '/login' && isEmpty(user.token)) {
        return { path: '/login' }
    }
});

export default router;
import Vue from 'vue';
import VueRouter from 'vue-router';
import type { RouteConfig } from 'vue-router';
import { kebabCase } from "lodash";

function routePages() {
    const result: Array<RouteConfig> = [
        {
            path: '/',
            component: () => import("./pages/IndexPage.vue"),
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
                component: pages[p],
            });
        }
    }
    console.log('routes', result);
    return result;
}

Vue.use(VueRouter);

const routes = routePages();

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
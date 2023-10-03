/// <reference types="vite/client" />

import type VueRouter from "vue-router";
import type { Route } from "vue-router";

declare module "*.vue" {
    import type { DefineComponent, ComponentOptions } from "vue";

    const vueComponent: DefineComponent<{},{},any>;

    export default vueComponent;
}

// 无效。
declare module "vue/types/vue" {

    // interface Vue {
    interface DefineComponent {
        $router: VueRouter,
        $route: Route,
    }
}
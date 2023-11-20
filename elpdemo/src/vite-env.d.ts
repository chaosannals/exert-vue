/// <reference types="vite/client" />

declare module 'element-plus/dist/locale/zh-cn.mjs';

declare module "*?raw" {
    export default string;
}
declare module "*?url" {
    export default string;
}

declare module "*.vue" {
    import type { DefineComponent } from "vue";

    const vueComponent: DefineComponent<{}, {}, any>;

    export default vueComponent;
}

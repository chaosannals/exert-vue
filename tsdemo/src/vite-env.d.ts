/// <reference types="vite/client" />

declare const __STATIC_FILES__: string[];

declare module "*.vue" {
    import type { DefineComponent } from "vue";

    const vueComponent: DefineComponent<{}, {}, any>;

    export default vueComponent;
}

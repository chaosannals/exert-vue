# exert vue

## vite 创建 vue2 项目

## js

```bash
# 创建项目 选 Vanilla （原味，就是纯JS）
npm create vite@latest

# 进入项目装 支持 vue2 插件
npm i -D vite-plugin-vue2

# 配置这个插件 vite.config.js

# 装 vue 
npm i vue@2

# 装 vue 模板编译器
npm i -D vue-template-compiler

# 修改 index.html 指向 /src/main.js 并移动 main.js 到 src
# 按 vue2 的方式写 main.js 和 App.vue（这就是基本的项目）
# 清理不需要的文件。

# 一般需要引入路由（router.js写法照旧）
npm i vue-router@3

```

```js
// vite.config.js

import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  plugins: [
    createVuePlugin(),
  ],
});
```

### ts

```bash
# 创建项目 选 Vanilla （原味，就是纯 TS）
npm create vite@latest

# 进入项目装 支持 vue2 插件
npm i -D vite-plugin-vue2

# 配置这个插件 vite.config.ts

# 装 vue 
npm i vue@2

# 装 vue 模板编译器
npm i -D vue-template-compiler

# 给 vite-env.d.ts 添加申明

# 按 vue2 的方式写 main.ts 和 App.vue（这就是基本的项目）
# 清理不需要的文件。

# 一般需要引入路由（router.ts写法照旧）
# 有个问题：new Vue({}) 的声明没有 router 参数。目前忽略类型检查绕过。
npm i vue-router@3
```

```ts
// vite-env.d.ts
declare module "*.vue" {
    import type { DefineComponent } from "vue";

    const vueComponent: DefineComponent<{},{},any>;

    export default vueComponent;
}
```
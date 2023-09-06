# exert vue

## vite 创建 vue2 项目

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

# 按 vue2 的方式写 main.js 和 App.vue（这就是基本的项目）

# 一般需要引入路由（router.js写法照旧）
npm i vue-router@3

```

```js
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  plugins: [
    createVuePlugin(),
  ],
});
```
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync, statSync } from 'fs';
// node 相关的模块 url path fs 因为 TS 没有申明，所以需要 @types/node 模块

const here = fileURLToPath(import.meta.url);
const projectDir = dirname(here);
const publicDir = join(projectDir, 'public');

function globDir(dirPath): string[] {
  const result = [];
  const names = readdirSync(dirPath);
  for (const name of names) {
    const path = join(dirPath, name);
    const stat = statSync(path);
    if (stat.isFile()) {
      result.push(path);
    } else if (stat.isDirectory()) {
      globDir(path).forEach(i => result.push(i));
    }
  }
  console.log('globDir', result);
  return result;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    __STATIC_FILES__: globDir(publicDir), // 预设的全局变量需要在 vite-env.d.ts 里面声明类型
  },
  build: {
    rollupOptions: {
      output: {
        // 简单指定模块拆分。
        // manualChunks: {
        //   lodash: ['lodash'], // 74.48k
        //   'crypto-js': ['crypto-js'], // 这个很小 5k 没啥意义。
        //   marked: ['marked'], // 35.97k
        //   'highlight.js': ['highlight.js'], // 913.25k 好大，而且这个包没有依赖其他包，没办法再拆。
        // },

        // 通过函数拆分。node_modules 都被合并到块 vendor 里
        // manualChunks(id, {getModuleInfo, getModuleIds}) {
        //   if (id.includes('node_modules')) {
        //     return 'vendor';
        //   }
        // },

        // 默认的分包策略是吧依赖弄到 index 里面。
      },
    },
  },
  server: {
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});

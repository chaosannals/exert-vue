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
});

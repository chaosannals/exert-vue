import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync, statSync } from 'fs';

const here = fileURLToPath(import.meta.url);
const projectDir = dirname(here);
const publicDir = join(projectDir, 'public');

function globDir(dirPath) {
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
    __STATIC_FILES__: globDir(publicDir),
  },
});

import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { sha512crypt } from 'sha512crypt-node';

const a = '123123';
const salt = '123123';
const h1 = sha512crypt(a, salt);
const h2 = sha512crypt(a, salt);

console.log('hash', h1);
console.log('hash', h2);
console.log('hash', h1 === h2);

export default defineConfig({
  plugins: [
    createVuePlugin(),
  ],
});

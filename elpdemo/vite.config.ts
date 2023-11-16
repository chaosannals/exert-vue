import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default (async ({ mode }) => {
  return defineConfig({
    server: {
      port: 45173,
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // 这个组件可以附加自定义自动导入组件。
        dirs: [
          'src/components',
          "src/dialogs",
          'src/layouts',
        ],
        resolvers: [ElementPlusResolver()],
      }),
    ],
  });
});
